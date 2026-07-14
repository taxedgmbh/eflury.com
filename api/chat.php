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

$systemPrompt = "You are the assistant on eflury.com, the website of eFlury Consulting — Emanuel Flury's AI-automation consultancy for Swiss SMEs in Grenchen (Solothurn), Switzerland. You answer questions from potential clients about the services, prices, and approach. $langHint

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
13 years enterprise automation incl. Fortune 100 (Johnson & Johnson, 2012–2024). Founder of Taxed GmbH (Swiss fiduciary, 2021) — he uses these automations in his own firm first. UiPath RPA certified, MA Economics-Finance (University of Aberdeen). eFlury Consulting is a young business; published results come from his own firm and documented projects.

## RESOURCES:
Free downloadable guides (EN/DE): EU AI Act for Swiss SMEs, revDSG & AI, Data Quality — at /$siteLang/" . ($siteLang === 'de' ? 'leitfaeden' : 'guides') . "/. Blog with practical articles.

## CONTACT / NEXT STEP:
Free 30-minute call, no obligation, response within 24 hours. Contact page: " . ($siteLang === 'de' ? '/de/kontakt/' : '/en/contact/') . " · me@eflury.com · +41 79 910 77 87

## RULES:
- Be concise (2-6 sentences unless asked for detail), warm, professional.
- Only state facts from this prompt. If you don't know something, say so and point to the free 30-minute call.
- Never invent discounts, guarantees, client names, or services not listed here.
- For anything project-specific, recommend the free call or the AI Audit as the concrete first step.";

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
    'max_tokens' => 500,
    'temperature' => 0.4
];

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
$reply = $data['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.';

echo json_encode(['reply' => $reply]);
