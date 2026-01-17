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

// System prompt for the chatbot
$systemPrompt = "You are an AI assistant for Emanuel Flury's consulting website (eflury.com). Emanuel is a Claude automation specialist and business automation consultant based in Switzerland.

Key information about Emanuel's services:
- Agentic AI Consulting: Multi-agent systems, LLM orchestration, Claude Skills, MCP servers
- Business Automation: RPA (UiPath certified), process optimization, 70%+ time savings
- AI Workflows: RAG architecture, vector databases, semantic search
- Digital Transformation: Strategy, roadmaps, change management

Pricing packages:
- Starter: CHF 8,000 (1-3 processes)
- Professional: CHF 15,000 (5-8 workflows, 6-month support)
- Enterprise: CHF 25,000+ (organization-wide implementation)

Contact: me@eflury.com | +41 79 910 77 87 | Grenchen, Switzerland

Be helpful, concise, and professional. If asked about specific project details or pricing negotiations, suggest they contact Emanuel directly. Answer in the same language the user writes in (German or English).";

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
