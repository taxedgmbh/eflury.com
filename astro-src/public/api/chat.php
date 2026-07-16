<?php
/**
 * AI Chat API Proxy for eflury.com
 * Securely proxies requests to DeepSeek API
 *
 * SECURITY: API key must be set via environment variable or config file
 * See README.md for deployment instructions
 */

// CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://eflury.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// DeepSeek API Configuration
// Priority: 1. Environment variable, 2. Config file, 3. Error
$API_KEY = getenv('DEEPSEEK_API_KEY');

// Fallback to config file if environment variable not set
if (!$API_KEY) {
    $configFile = __DIR__ . '/config.php';
    if (file_exists($configFile)) {
        $config = require $configFile;
        $API_KEY = $config['DEEPSEEK_API_KEY'] ?? null;
    }
}

// Validate API key exists
if (!$API_KEY) {
    http_response_code(500);
    echo json_encode(['error' => 'API configuration error. Please contact the administrator.']);
    error_log('DEEPSEEK_API_KEY not configured. Set via environment variable or api/config.php');
    exit;
}

$API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Get request body
$input = json_decode(file_get_contents('php://input'), true);
$userMessage = $input['message'] ?? '';

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit;
}

// Rate limiting (simple per-IP)
session_start();
$now = time();
$_SESSION['chat_requests'] = $_SESSION['chat_requests'] ?? [];
$_SESSION['chat_requests'] = array_filter($_SESSION['chat_requests'], fn($t) => $t > $now - 60);

if (count($_SESSION['chat_requests']) >= 10) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please wait a moment.']);
    exit;
}
$_SESSION['chat_requests'][] = $now;

// System prompt — facts mirror the live pages (keep in sync with /llms.txt)
$siteLang = ($input['lang'] ?? 'en') === 'de' ? 'de' : 'en';
$langHint = $siteLang === 'de'
    ? "The visitor is browsing the GERMAN site. Answer in German (Swiss business German, Sie-Form) unless they clearly write in another language."
    : "The visitor is browsing the English site. Answer in English unless they clearly write in another language.";

$systemPrompt = "You are Effi, the automation guide on eflury.com — the website of eFlury Consulting, a Swiss AI-automation consultancy for SME owners across industries, founded and led by Emanuel Flury in Grenchen (Solothurn), Switzerland. Your job is to build trust: help visitors understand whether and how AI automation fits their business, and guide them toward a free 30-minute call. $langHint

## SERVICES (the complete current list — never mention other offerings):
- AI Audit — CHF 4,900 fixed, one week. Deliverables: process inventory with automation scores, data-readiness check, prioritized roadmap, fixed-price implementation quote. Fully credited toward any implementation package booked within 6 months. Page: /$siteLang/services/" . ($siteLang === 'de' ? 'ki-audit' : 'ai-audit') . "/
- Managed AI Operations — ongoing operation, monitoring and improvement of deployed automations, from CHF 1,200/month.
- Custom Claude Skills for recurring business processes
- MCP integrations (connecting AI to business systems like bexio, databases, internal tools)
- Finance automation (month-end close, reconciliation, reporting)
- Power BI dashboards and automated reporting
- Data quality (cleansing, validation, pipelines — data readiness for AI)

## PACKAGES (fixed prices in CHF, excl. 8.1% VAT):
- Micro: CHF 5,900 (2 weeks, 1 Claude Skill, 1 MCP integration)
- Starter: CHF 9,900
- Professional: CHF 24,900 (most chosen)
- Enterprise: CHF 49,900
- Add-ons: extra Claude Skill CHF 2,900 · extra MCP integration CHF 3,500 · Extended Support CHF 1,200/month · on-site workshop CHF 1,800/day
- Professional & Enterprise include support until the agreed automation goals are reached. ROI figures on the site are estimates and can vary.

## METHOD (5 phases, go/no-go gate after each):
Discovery (week 1) → Design (week 2) → Development (weeks 3–5) → Deployment (week 6) → Optimization (ongoing, optionally as Managed AI Operations).

## RESULTS (documented per-project estimates — always call them estimates):
- Taxed GmbH (Emanuel's own fiduciary firm): ~27.5 h/week automated, ~CHF 24K/year, ~3.2-month payback
- Finance process automation (manufacturing client): ~40 h/month, ~CHF 48K/year
- Power BI reporting (professional-services client): ~15 h/week, ~CHF 36K/year

## ABOUT EMANUEL:
13 years of enterprise automation experience at large multinational companies. Founder of Taxed GmbH (Swiss fiduciary, 2021) — he uses these automations in his own firm first. UiPath RPA certified, MA Economics-Finance (University of Aberdeen). eFlury Consulting is a young business; published results come from his own firm and documented projects. Do not name former employers.

## COMPANY / LEGAL FACTS (answer exactly, never embellish):
eFlury Consulting is a Swiss sole proprietorship (Einzelunternehmen), owner Emanuel Aaron Flury, Keltenweg 4, 2540 Grenchen. It is NOT entered in the commercial register (Handelsregister) and has NO UID/CHE number — as a sole proprietorship below the legal revenue threshold it is not required to register, which is fully legal. NEVER state, guess, or invent a UID, CHE, Zefix, or register number. If asked about registration, explain the above in one or two sentences and refer to the imprint page (/en/imprint/ or /de/impressum/).

## RESOURCES:
Free downloadable guides (EN/DE): EU AI Act for Swiss SMEs, revDSG & AI, Data Quality — at /$siteLang/" . ($siteLang === 'de' ? 'leitfaeden' : 'guides') . "/. Blog with practical articles.

## CONTACT / NEXT STEP:
Free 30-minute call, no obligation, response within 24 hours. Contact page: " . ($siteLang === 'de' ? '/de/kontakt/' : '/en/contact/') . " · me@eflury.com · +41 79 910 77 87

## LEAD CAPTURE:
When a visitor shows concrete interest (wants to start, asks about availability, describes their processes, or asks to be contacted), offer to pass their details to Emanuel. Collect at least their name and email (company and phone optional), then ask one short confirmation question ('May Emanuel contact you at that address?' — mention details are handled per the privacy policy at " . ($siteLang === 'de' ? '/de/datenschutz/' : '/en/privacy/') . "). Only after they confirm, call the submit_lead tool with a 2-3 sentence summary of their situation from this conversation. After the tool succeeds, tell them Emanuel will get back within 24 hours. Never call the tool without name, email, and confirmation. Never invent contact data.

## LINKS:
When you point to a page, format it as a markdown link, e.g. [" . ($siteLang === 'de' ? 'Kontaktseite](/de/kontakt/)' : 'contact page](/en/contact/)') . ".

## RULES:
- Be concise (2-6 sentences unless asked for detail), warm, professional. You are a guide, not a salesperson.
- Lead with understanding the visitor's situation and explaining the approach. Do NOT bring up prices unless the visitor explicitly asks — the numbers above are only for answering direct pricing questions, and always add that details are on the pricing page.
- Only state facts from this prompt. If you don't know something, say so honestly and point to the free 30-minute call.
- Never invent discounts, guarantees, client names, registry numbers, or services not listed here.
- For anything project-specific, recommend the free call as the natural next step.";

// Optional short conversation history from the client (validated)
$history = [];
if (isset($input['history']) && is_array($input['history'])) {
    foreach (array_slice($input['history'], -8) as $turn) {
        if (isset($turn['role'], $turn['content'])
            && in_array($turn['role'], ['user', 'assistant'], true)
            && is_string($turn['content']) && strlen($turn['content']) <= 2000) {
            $history[] = ['role' => $turn['role'], 'content' => $turn['content']];
        }
    }
}

// Prepare API request
$payload = [
    'model' => 'deepseek-chat',
    'messages' => array_merge(
        [['role' => 'system', 'content' => $systemPrompt]],
        $history,
        [['role' => 'user', 'content' => $userMessage]]
    ),
    'tools' => [[
        'type' => 'function',
        'function' => [
            'name' => 'submit_lead',
            'description' => 'Save a confirmed lead to the CRM so Emanuel can follow up. Call only after the visitor gave name, email, and explicit consent.',
            'parameters' => [
                'type' => 'object',
                'properties' => [
                    'name' => ['type' => 'string', 'description' => 'Full name of the visitor'],
                    'email' => ['type' => 'string', 'description' => 'Email address of the visitor'],
                    'company' => ['type' => 'string', 'description' => 'Company name (optional)'],
                    'phone' => ['type' => 'string', 'description' => 'Phone number (optional)'],
                    'summary' => ['type' => 'string', 'description' => '2-3 sentence summary of what the visitor needs, based on the conversation'],
                ],
                'required' => ['name', 'email', 'summary'],
            ],
        ],
    ]],
    'max_tokens' => 500,
    'temperature' => 0.4
];

// Submit a confirmed lead to the HubSpot contact form (server-side)
function submitLeadToHubspot(array $args, string $siteLang): array {
    $email = trim($args['email'] ?? '');
    $name = trim($args['name'] ?? '');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $name === '') {
        return ['ok' => false, 'error' => 'invalid name or email'];
    }
    $summary = trim($args['summary'] ?? '');
    $extra = [];
    if (!empty($args['company'])) $extra[] = 'Company: ' . trim($args['company']);
    if (!empty($args['phone'])) $extra[] = 'Phone: ' . trim($args['phone']);
    $message = "[Lead captured by Effi, the website assistant]\n\n" . $summary
        . ($extra ? "\n" . implode("\n", $extra) : '');

    $payload = json_encode([
        'fields' => [
            ['objectTypeId' => '0-1', 'name' => 'firstname', 'value' => $name],
            ['objectTypeId' => '0-1', 'name' => 'email', 'value' => $email],
            ['objectTypeId' => '0-1', 'name' => 'message', 'value' => $message],
        ],
        'context' => [
            'pageUri' => 'https://eflury.com/' . $siteLang . '/',
            'pageName' => 'Effi chatbot lead',
        ],
    ]);
    $ch = curl_init('https://api-eu1.hsforms.com/submissions/v3/integration/submit/148876247/964cc7b9-969c-4007-ae49-232ad1117b8c');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 15,
    ]);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $code >= 200 && $code < 300 ? ['ok' => true] : ['ok' => false, 'error' => 'crm error ' . $code];
}

// Make API request
$ch = curl_init($API_URL);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $API_KEY
    ],
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to connect to AI service']);
    exit;
}

if ($httpCode !== 200) {
    http_response_code(502);
    echo json_encode(['error' => 'AI service error', 'details' => $response]);
    exit;
}

$data = json_decode($response, true);
$assistantMsg = $data['choices'][0]['message'] ?? [];
$leadCaptured = false;

if (!empty($assistantMsg['tool_calls'])) {
    $toolCall = $assistantMsg['tool_calls'][0];
    $args = json_decode($toolCall['function']['arguments'] ?? '{}', true) ?: [];
    $result = ($toolCall['function']['name'] ?? '') === 'submit_lead'
        ? submitLeadToHubspot($args, $siteLang)
        : ['ok' => false, 'error' => 'unknown tool'];
    $leadCaptured = $result['ok'];

    // Second pass: give the model the tool result so it can confirm naturally
    $payload['messages'][] = $assistantMsg;
    $payload['messages'][] = [
        'role' => 'tool',
        'tool_call_id' => $toolCall['id'],
        'content' => json_encode($result),
    ];
    unset($payload['tools']);

    $ch = curl_init($API_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $API_KEY
        ],
        CURLOPT_TIMEOUT => 30
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($response, true);
    $assistantMsg = $data['choices'][0]['message'] ?? [];
}

$reply = $assistantMsg['content'] ?? 'Sorry, I could not generate a response.';

echo json_encode(['reply' => $reply, 'leadCaptured' => $leadCaptured]);
