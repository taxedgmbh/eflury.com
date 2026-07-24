<?php
/**
 * Offer acceptance for eflury.com — click-accept with evidence trail.
 *
 * Flow: the owner generates a signed acceptance link (action=link, admin
 * key required). The client opens the acceptance page, which loads the
 * offer summary (action=view) and submits the acceptance (action=accept).
 * On acceptance: server-side archive, receipt email to BOTH parties with
 * the versioned AGB PDF attached, and a mirror into HubSpot (contact
 * upsert + note) via a Private App token.
 *
 * config.php keys (see README):
 *   ACCEPT_SECRET             — random string, signs offer links (required)
 *   ACCEPT_ADMIN_KEY          — random string, protects link generation (required)
 *   HUBSPOT_PRIVATE_APP_TOKEN — pat-eu1-… for the CRM mirror (optional)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://eflury.com');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$MAIL_TO = 'me@eflury.com';
$MAIL_FROM = 'offerte@eflury.com';
$AGB_VERSION = '2026-07-23';
$AGB_PDF = [
    'de' => __DIR__ . '/../downloads/agb/eflury-agb-de-2026-07-23.pdf',
    'en' => __DIR__ . '/../downloads/agb/eflury-gtc-en-2026-07-23.pdf',
];
$AGB_URL = ['de' => 'https://eflury.com/de/nutzungsbedingungen/', 'en' => 'https://eflury.com/en/terms/'];
$LINK_TTL = 60 * 24 * 3600; // signed links valid 60 days

$config = [];
$configFile = __DIR__ . '/config.php';
if (file_exists($configFile)) {
    $config = require $configFile;
}
$SECRET = $config['ACCEPT_SECRET'] ?? '';
$ADMIN_KEY = $config['ACCEPT_ADMIN_KEY'] ?? '';
// HubSpot Service Key (current model) or legacy private-app token — same
// Bearer usage on api.hubapi.com either way.
$HS_TOKEN = $config['HUBSPOT_SERVICE_KEY'] ?? $config['HUBSPOT_PRIVATE_APP_TOKEN'] ?? '';

if ($SECRET === '') {
    http_response_code(503);
    echo json_encode(['error' => 'config', 'message' => 'ACCEPT_SECRET not configured on the server.']);
    exit;
}

function fail(int $code, string $err, string $msg): void {
    http_response_code($code);
    echo json_encode(['error' => $err, 'message' => $msg]);
    exit;
}

/** Canonical string that gets signed: all offer fields + expiry. */
function offer_payload(array $o): string {
    return implode('|', [$o['nr'], $o['titel'], $o['betrag'], $o['email'], $o['firma'], $o['lang'], $o['exp']]);
}

function offer_from_request(array $src): array {
    $o = [
        'nr' => trim((string)($src['nr'] ?? '')),
        'titel' => trim((string)($src['titel'] ?? '')),
        'betrag' => trim((string)($src['betrag'] ?? '')),
        'email' => trim((string)($src['email'] ?? '')),
        'firma' => trim((string)($src['firma'] ?? '')),
        'lang' => ($src['lang'] ?? 'de') === 'en' ? 'en' : 'de',
        'exp' => (int)($src['exp'] ?? 0),
    ];
    foreach (['nr', 'titel', 'betrag', 'email', 'firma'] as $k) {
        if ($o[$k] === '' || strlen($o[$k]) > 300 || strpos($o[$k], '|') !== false) {
            fail(400, 'validation', "Field '$k' missing, too long or contains '|'.");
        }
    }
    if (!filter_var($o['email'], FILTER_VALIDATE_EMAIL)) {
        fail(400, 'validation', 'Invalid client email.');
    }
    return $o;
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// ---------------------------------------------------------------- link
if ($action === 'link') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'method', 'POST required.');
    if ($ADMIN_KEY === '' || !hash_equals($ADMIN_KEY, (string)($_POST['admin_key'] ?? ''))) {
        fail(403, 'auth', 'Invalid admin key.');
    }
    $o = offer_from_request($_POST);
    $o['exp'] = time() + $LINK_TTL;
    $sig = hash_hmac('sha256', offer_payload($o), $SECRET);
    $qs = http_build_query(['nr' => $o['nr'], 'titel' => $o['titel'], 'betrag' => $o['betrag'],
        'email' => $o['email'], 'firma' => $o['firma'], 'lang' => $o['lang'], 'exp' => $o['exp'], 'sig' => $sig]);
    $path = $o['lang'] === 'en' ? '/offer/' : '/offerte/';
    echo json_encode(['ok' => true, 'url' => 'https://eflury.com' . $path . '?' . $qs,
        'valid_until' => date('Y-m-d', $o['exp'])]);
    exit;
}

// Both view and accept need a validly signed offer.
$src = $_SERVER['REQUEST_METHOD'] === 'POST' ? $_POST : $_GET;
$o = offer_from_request($src);
$sig = (string)($src['sig'] ?? '');
if (!hash_equals(hash_hmac('sha256', offer_payload($o), $SECRET), $sig)) {
    fail(403, 'signature', 'Invalid or manipulated link.');
}
if ($o['exp'] < time()) {
    fail(410, 'expired', 'This acceptance link has expired. Please request a new one.');
}

$archiveDir = __DIR__ . '/annahmen';
$acceptedMarker = $archiveDir . '/accepted_' . preg_replace('/[^A-Za-z0-9._-]/', '_', $o['nr']) . '.flag';

// ---------------------------------------------------------------- view
if ($action === 'view') {
    echo json_encode(['ok' => true, 'offer' => [
        'nr' => $o['nr'], 'titel' => $o['titel'], 'betrag' => $o['betrag'],
        'email' => $o['email'], 'firma' => $o['firma'], 'lang' => $o['lang'],
        'agb_version' => $AGB_VERSION,
        'agb_url' => $AGB_URL[$o['lang']],
        'already_accepted' => file_exists($acceptedMarker),
    ]]);
    exit;
}

// -------------------------------------------------------------- accept
if ($action !== 'accept') fail(400, 'action', 'Unknown action.');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'method', 'POST required.');

// Honeypot: pretend success, record nothing.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string)($_POST['name'] ?? ''));
$funktion = trim((string)($_POST['funktion'] ?? ''));
if ($name === '' || strlen($name) > 200 || strlen($funktion) > 200) {
    fail(400, 'validation', 'Name is required.');
}
if (($_POST['agb'] ?? '') !== '1' || ($_POST['vollmacht'] ?? '') !== '1') {
    fail(400, 'validation', 'Both confirmations are required.');
}
if (file_exists($acceptedMarker)) {
    echo json_encode(['ok' => true, 'already' => true]);
    exit;
}

// ---- evidence record, server-side (web access denied) ----
if (!is_dir($archiveDir)) {
    mkdir($archiveDir, 0750, true);
}
if (!file_exists($archiveDir . '/.htaccess')) {
    file_put_contents($archiveDir . '/.htaccess', "Require all denied\n");
}
$now = date('c');
$record = "OFFERT-ANNAHME / OFFER ACCEPTANCE\n"
    . "Zeitpunkt: $now\n"
    . "Offerte: {$o['nr']} — {$o['titel']}\n"
    . "Betrag: {$o['betrag']}\n"
    . "Firma: {$o['firma']}\n"
    . "Akzeptiert durch: $name" . ($funktion !== '' ? " ($funktion)" : '') . "\n"
    . "E-Mail (Offert-Empfänger): {$o['email']}\n"
    . "AGB-Version: $AGB_VERSION ({$AGB_URL[$o['lang']]})\n"
    . "Bestätigungen: AGB gelesen und akzeptiert; Handlungsberechtigung bestätigt\n"
    . "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '?') . "\n"
    . "User-Agent: " . substr((string)($_SERVER['HTTP_USER_AGENT'] ?? '?'), 0, 300) . "\n"
    . "Link-Signatur: $sig\n";
$dir = $archiveDir . '/' . date('Ymd_His') . '_' . preg_replace('/[^A-Za-z0-9._-]/', '_', $o['nr']);
mkdir($dir, 0750, true);
file_put_contents($dir . '/annahme.txt', $record);
file_put_contents($acceptedMarker, $now . ' ' . $name . "\n");

// ---- receipt email to both parties, AGB PDF attached ----
$de = $o['lang'] === 'de';
$subject = $de
    ? "Offert-Annahme bestätigt: {$o['nr']} — {$o['titel']}"
    : "Offer acceptance confirmed: {$o['nr']} — {$o['titel']}";
$body = ($de
    ? "Guten Tag\n\nDiese E-Mail bestätigt die Annahme der folgenden Offerte:\n\n"
    : "Hello\n\nThis email confirms the acceptance of the following offer:\n\n")
    . $record
    . ($de
    ? "\nDie akzeptierte AGB-Version ist als PDF beigelegt und dauerhaft abrufbar unter {$AGB_URL['de']}.\n\nFreundliche Grüsse\neFlury Consulting, Emanuel Aaron Flury\nKeltenweg 4, 2540 Grenchen · me@eflury.com · +41 79 910 77 87\n"
    : "\nThe accepted GTC version is attached as PDF and permanently available at {$AGB_URL['en']}.\n\nKind regards\neFlury Consulting, Emanuel Aaron Flury\nKeltenweg 4, 2540 Grenchen, Switzerland · me@eflury.com · +41 79 910 77 87\n");

$boundary = 'b' . bin2hex(random_bytes(12));
$headers = "From: eFlury Consulting <$MAIL_FROM>\r\n"
    . "Reply-To: eFlury Consulting <$MAIL_TO>\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
$mime = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n$body\r\n";
$pdfPath = $AGB_PDF[$o['lang']];
if (is_readable($pdfPath)) {
    $fname = basename($pdfPath);
    $data = chunk_split(base64_encode((string)file_get_contents($pdfPath)));
    $mime .= "--$boundary\r\n"
        . "Content-Type: application/pdf; name=\"$fname\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . "Content-Disposition: attachment; filename=\"$fname\"\r\n\r\n"
        . $data . "\r\n";
}
$mime .= "--$boundary--\r\n";
$subjEnc = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$mailClient = @mail($o['email'], $subjEnc, $mime, $headers);
$mailOwner = @mail($MAIL_TO, $subjEnc, $mime, $headers);

// ---- HubSpot mirror: contact upsert + note (Private App token) ----
$crmOk = false;
if ($HS_TOKEN !== '') {
    $hs = function (string $method, string $path, ?array $json) use ($HS_TOKEN) {
        $ch = curl_init('https://api.hubapi.com' . $path);
        $opts = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $HS_TOKEN, 'Content-Type: application/json'],
            CURLOPT_TIMEOUT => 15,
        ];
        if ($json !== null) $opts[CURLOPT_POSTFIELDS] = json_encode($json);
        curl_setopt_array($ch, $opts);
        $resp = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [$code, json_decode((string)$resp, true)];
    };
    try {
        [$code, $found] = $hs('POST', '/crm/v3/objects/contacts/search', [
            'filterGroups' => [['filters' => [['propertyName' => 'email', 'operator' => 'EQ', 'value' => $o['email']]]]],
            'limit' => 1,
        ]);
        $contactId = $found['results'][0]['id'] ?? null;
        if ($contactId === null && $code < 500) {
            [$code2, $created] = $hs('POST', '/crm/v3/objects/contacts', [
                'properties' => ['email' => $o['email'], 'firstname' => $name, 'company' => $o['firma']],
            ]);
            $contactId = $created['id'] ?? null;
        }
        if ($contactId !== null) {
            $noteBody = "AGB akzeptiert (Offert-Annahme über eflury.com)\n"
                . "Offerte: {$o['nr']} — {$o['titel']} — {$o['betrag']}\n"
                . "Firma: {$o['firma']} · Akzeptiert durch: $name" . ($funktion !== '' ? " ($funktion)" : '') . "\n"
                . "AGB-Version: $AGB_VERSION · Zeitpunkt: $now\n"
                . "Beleg: E-Mail-Quittung an beide Parteien, Server-Archiv.";
            [$code3] = $hs('POST', '/crm/v3/objects/notes', [
                'properties' => ['hs_note_body' => $noteBody, 'hs_timestamp' => round(microtime(true) * 1000)],
                'associations' => [[
                    'to' => ['id' => $contactId],
                    'types' => [['associationCategory' => 'HUBSPOT_DEFINED', 'associationTypeId' => 202]],
                ]],
            ]);
            $crmOk = $code3 >= 200 && $code3 < 300;
        }
    } catch (\Throwable $e) {
        error_log('accept.php hubspot mirror failed: ' . $e->getMessage());
    }
}

if (!$mailClient && !$mailOwner) {
    error_log("accept.php: acceptance archived in $dir but no email could be sent");
}

echo json_encode(['ok' => true, 'mailClient' => (bool)$mailClient, 'mailOwner' => (bool)$mailOwner, 'crm' => $crmOk]);
