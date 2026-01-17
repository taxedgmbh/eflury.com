<?php
/**
 * AI Chat API Proxy for eflury.com
 * Securely proxies requests to DeepSeek API
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
$API_KEY = 'sk-182780cd7e184d8887f9d20360f3718b';
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

// System prompt for the chatbot - Updated with research-backed content
$systemPrompt = "You are an AI assistant for Emanuel Flury's consulting website (eflury.com). Emanuel is an independent AI & automation consultant helping Swiss KMUs (SMEs) close the AI adoption gap.

## MARKET CONTEXT (cite these when relevant):
- Only 8% of Swiss SMEs use AI vs 30%+ of large companies (digitalswitzerland 2024)
- 78% of organizations globally now use AI in at least one function (McKinsey 2025)
- AI adoption in Switzerland growing 48% annually (digitalswitzerland 2024)
- Switzerland ranks 2nd globally in digital competitiveness

## SERVICES:

1. Agentic AI Consulting
   - By 2028: 33% of enterprise software will include agentic AI (Gartner 2025)
   - Market: USD 7B (2025) → USD 52B (2030) at 46% CAGR
   - Technologies: Claude, LangChain, CrewAI, MCP
   - Multi-agent systems, LLM orchestration, human-in-the-loop design

2. Business Automation (RPA)
   - 53% of businesses have implemented RPA (Deloitte 2024)
   - ROI: 30-200% first-year ROI, 12-month average payback (Deloitte)
   - RPA bots cost 1/3 of offshore, 1/5 of onshore FTEs
   - UiPath certified, invoice processing to customer service

3. RAG & Knowledge Systems
   - 70% of enterprises use RAG with vector databases (Databricks 2024)
   - ROI: CHF 3.70 return per CHF 1 invested
   - 70-90% reduction in AI hallucinations
   - Enterprise knowledge search, document processing

4. Digital Transformation Strategy
   - AI readiness assessment and automation roadmaps
   - ROI analysis and business case development
   - Swiss DSG and GDPR compliance

## PRICING:
- Typical starter projects begin under CHF 10,000
- Initial automation assessments: 1-2 weeks
- Implementation projects: 4-12 weeks depending on scope
- Free initial consultation available

## ABOUT EMANUEL:
- 13+ years Fortune 500 automation experience (Johnson & Johnson 2012-2024)
- Master in Economics-Finance (University of Aberdeen)
- Certifications: UiPath RPA Developer, Alteryx Designer Core, Power BI Analyst
- Founder of Taxed GmbH (Swiss fiduciary services)
- Based in Grenchen, Switzerland

## CONTACT:
- Email: me@eflury.com
- Phone: +41 79 910 77 87
- Location: Grenchen, Switzerland

## RESPONSE GUIDELINES:
- Be helpful, concise, and professional
- Cite research sources when discussing statistics (e.g., 'According to Deloitte...')
- For specific project details or pricing negotiations, suggest contacting Emanuel directly
- Answer in the same language the user writes in (German or English)
- Emphasize the 8% Swiss SME AI adoption gap as an opportunity
- Focus on measurable ROI and Swiss data protection compliance";

// Prepare API request
$payload = [
    'model' => 'deepseek-chat',
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $userMessage]
    ],
    'max_tokens' => 500,
    'temperature' => 0.7
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
