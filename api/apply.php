<?php
/**
 * Job application intake for eflury.com (career portal).
 *
 * Accepts multipart/form-data, stores the documents in a web-inaccessible
 * folder, emails the full application to the owner and mirrors the lead
 * into HubSpot (same unauthenticated Forms v3 endpoint the site already
 * uses — no API key required, file uploads travel by email instead
 * because the JSON forms endpoint cannot carry them).
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://eflury.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$MAIL_TO = 'me@eflury.com';
$MAIL_FROM = 'bewerbung@eflury.com';
$HUBSPOT_URL = 'https://api-eu1.hsforms.com/submissions/v3/integration/submit/148876247/964cc7b9-969c-4007-ae49-232ad1117b8c';
$MAX_FILE = 8 * 1024 * 1024;   // per file
$MAX_TOTAL = 15 * 1024 * 1024; // all files combined
$ALLOWED_EXT = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip'];

// Simple per-session rate limit: 3 applications per hour
session_start();
$now = time();
$_SESSION['apply_requests'] = array_filter(
    $_SESSION['apply_requests'] ?? [],
    fn($t) => $t > $now - 3600
);
if (count($_SESSION['apply_requests']) >= 3) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please try again later.']);
    exit;
}

// Honeypot: bots fill hidden fields — pretend success, store nothing.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$field = fn($k) => trim((string)($_POST[$k] ?? ''));
$vorname = $field('vorname');
$nachname = $field('nachname');
$email = $field('email');
$telefon = $field('telefon');
$gehalt = $field('gehalt');
$pensum = $field('pensum');
$empfohlen = $field('empfohlen');
$job = $field('job') ?: 'Initiativbewerbung';
$lang = $field('lang') === 'en' ? 'en' : 'de';

if ($vorname === '' || $nachname === '' || $gehalt === '' || $pensum === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || ($_POST['datenschutz'] ?? '') !== '1') {
    http_response_code(400);
    echo json_encode(['error' => 'validation', 'message' => 'Required fields missing or invalid.']);
    exit;
}
foreach ([$vorname, $nachname, $telefon, $gehalt, $pensum, $empfohlen, $job] as $v) {
    if (strlen($v) > 300) {
        http_response_code(400);
        echo json_encode(['error' => 'validation', 'message' => 'Field too long.']);
        exit;
    }
}

// ---- collect uploads (cv + zeugnisse required, anschreiben optional) ----
function collect_files(string $key): array {
    if (!isset($_FILES[$key])) return [];
    $f = $_FILES[$key];
    $out = [];
    $names = is_array($f['name']) ? $f['name'] : [$f['name']];
    $tmps = is_array($f['tmp_name']) ? $f['tmp_name'] : [$f['tmp_name']];
    $errs = is_array($f['error']) ? $f['error'] : [$f['error']];
    $sizes = is_array($f['size']) ? $f['size'] : [$f['size']];
    foreach ($names as $i => $name) {
        if (($errs[$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) continue;
        $out[] = ['name' => $name, 'tmp' => $tmps[$i], 'error' => $errs[$i], 'size' => $sizes[$i]];
    }
    return $out;
}

$groups = [
    'cv' => collect_files('cv'),
    'zeugnisse' => collect_files('zeugnisse'),
    'anschreiben' => collect_files('anschreiben'),
];
if (count($groups['cv']) === 0 || count($groups['zeugnisse']) === 0) {
    http_response_code(400);
    echo json_encode(['error' => 'validation', 'message' => 'CV and certificates are required.']);
    exit;
}

$total = 0;
$clean = [];
foreach ($groups as $group => $files) {
    foreach ($files as $f) {
        if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp'])) {
            http_response_code(400);
            echo json_encode(['error' => 'upload', 'message' => 'Upload failed for ' . basename($f['name'])]);
            exit;
        }
        $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, $ALLOWED_EXT, true) || $f['size'] > $MAX_FILE) {
            http_response_code(400);
            echo json_encode(['error' => 'upload', 'message' => 'File type or size not allowed: ' . basename($f['name'])]);
            exit;
        }
        $total += $f['size'];
        $safe = preg_replace('/[^A-Za-z0-9._-]/', '_', basename($f['name']));
        $clean[] = ['group' => $group, 'name' => $safe, 'tmp' => $f['tmp'], 'size' => $f['size']];
    }
}
if ($total > $MAX_TOTAL) {
    http_response_code(400);
    echo json_encode(['error' => 'upload', 'message' => 'Combined file size exceeds 15 MB.']);
    exit;
}

// ---- store a server-side copy in a denied directory ----
$baseDir = __DIR__ . '/bewerbungen';
if (!is_dir($baseDir)) {
    mkdir($baseDir, 0750, true);
}
// Deny all web access to stored applications (LiteSpeed/Apache 2.4)
if (!file_exists($baseDir . '/.htaccess')) {
    file_put_contents($baseDir . '/.htaccess', "Require all denied\n");
}
$appDir = $baseDir . '/' . date('Ymd_His') . '_' . bin2hex(random_bytes(4));
mkdir($appDir, 0750, true);
$meta = "Stelle: $job\nName: $vorname $nachname\nE-Mail: $email\nTelefon: $telefon\n"
      . "Gehaltsvorstellung: $gehalt\nPensum: $pensum\nEmpfohlen von: $empfohlen\n"
      . "Sprache: $lang\nZeit: " . date('c') . "\n";
file_put_contents($appDir . '/bewerbung.txt', $meta);
$stored = [];
foreach ($clean as $i => $f) {
    $dest = $appDir . '/' . $f['group'] . '_' . $i . '_' . $f['name'];
    if (move_uploaded_file($f['tmp'], $dest)) {
        $stored[] = ['group' => $f['group'], 'name' => $f['name'], 'path' => $dest, 'size' => $f['size']];
    }
}

// ---- email with attachments ----
$labels = ['cv' => 'CV/Lebenslauf', 'zeugnisse' => 'Zeugnisse & Diplome', 'anschreiben' => 'Anschreiben'];
$fileList = implode("\n", array_map(
    fn($s) => '- ' . $labels[$s['group']] . ': ' . $s['name'] . ' (' . round($s['size'] / 1024) . ' KB)',
    $stored
));
$body = "Neue Bewerbung über das Karriereportal eflury.com\n\n" . $meta . "\nUnterlagen:\n" . $fileList . "\n";

$boundary = 'b' . bin2hex(random_bytes(12));
$headers = "From: eFlury Karriereportal <$MAIL_FROM>\r\n"
         . "Reply-To: $vorname $nachname <$email>\r\n"
         . "MIME-Version: 1.0\r\n"
         . "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
$mime = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n$body\r\n";
foreach ($stored as $s) {
    $data = chunk_split(base64_encode((string)file_get_contents($s['path'])));
    $mime .= "--$boundary\r\n"
           . "Content-Type: application/octet-stream; name=\"{$s['name']}\"\r\n"
           . "Content-Transfer-Encoding: base64\r\n"
           . "Content-Disposition: attachment; filename=\"{$s['name']}\"\r\n\r\n"
           . $data . "\r\n";
}
$mime .= "--$boundary--\r\n";
$subject = '=?UTF-8?B?' . base64_encode("Bewerbung: $job — $vorname $nachname") . '?=';
$mailSent = @mail($MAIL_TO, $subject, $mime, $headers);

// ---- mirror the lead into HubSpot (text only) ----
$message = "[Bewerbung über das Karriereportal]\n\nStelle: $job\nTelefon: " . ($telefon ?: '—')
         . "\nGehaltsvorstellung: $gehalt\nPensum: $pensum\nEmpfohlen von: " . ($empfohlen ?: '—')
         . "\n\nUnterlagen (per E-Mail an $MAIL_TO zugestellt, Kopie auf dem Server):\n" . $fileList;
$payload = json_encode([
    'fields' => [
        ['objectTypeId' => '0-1', 'name' => 'firstname', 'value' => $vorname . ' ' . $nachname],
        ['objectTypeId' => '0-1', 'name' => 'email', 'value' => $email],
        ['objectTypeId' => '0-1', 'name' => 'message', 'value' => $message],
    ],
    'context' => [
        'pageUri' => 'https://eflury.com/' . $lang . '/' . ($lang === 'de' ? 'karriere' : 'careers') . '/',
        'pageName' => 'Career portal application',
    ],
]);
$ch = curl_init($HUBSPOT_URL);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT => 15,
]);
curl_exec($ch);
$crmOk = curl_getinfo($ch, CURLINFO_HTTP_CODE) >= 200 && curl_getinfo($ch, CURLINFO_HTTP_CODE) < 300;
curl_close($ch);

$_SESSION['apply_requests'][] = $now;

if ($mailSent || $crmOk) {
    echo json_encode(['ok' => true, 'mail' => (bool)$mailSent, 'crm' => $crmOk]);
} else {
    // Files are stored, but no notification reached the owner — tell the
    // applicant to use email so nothing silently disappears.
    error_log('apply.php: stored application in ' . $appDir . ' but mail and CRM both failed');
    http_response_code(500);
    echo json_encode(['error' => 'notify', 'message' => 'Could not submit. Please email your application to me@eflury.com.']);
}
