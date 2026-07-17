<?php
declare(strict_types=1);

$rawBody = file_get_contents('php://input');
$signature = preg_replace('/^sha256=/i', '', $_SERVER['HTTP_X_XPAYR_SIGNATURE'] ?? '');
$secret = getenv('XPAYR_WEBHOOK_SECRET') ?: '';
$expected = hash_hmac('sha256', $rawBody, $secret);

if (!$secret || !preg_match('/^[a-f0-9]{64}$/i', $signature) || !hash_equals($expected, $signature)) {
    http_response_code(401);
    exit('invalid signature');
}

$event = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
http_response_code(204);
