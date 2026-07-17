<?php
declare(strict_types=1);

$baseUrl = getenv('XPAYR_BASE_URL') ?: 'https://xpayr.com/api/v1';
$secretKey = getenv('XPAYR_SECRET_KEY');
if (!$secretKey) {
    throw new RuntimeException('Set XPAYR_SECRET_KEY to an sk_test_* key.');
}

$payload = [
    'amount' => '49.90',
    'currency' => 'USDC',
    'network' => 'bsc-testnet',
    'order_id' => 'ORDER-1001',
    'description' => 'Test checkout',
    'metadata' => ['source' => 'xpayr-api-examples'],
];

$handle = curl_init(rtrim($baseUrl, '/') . '/payments');
curl_setopt_array($handle, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $secretKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_THROW_ON_ERROR),
    CURLOPT_TIMEOUT => 20,
]);
$body = curl_exec($handle);
$status = curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
if ($body === false) {
    throw new RuntimeException(curl_error($handle));
}
curl_close($handle);
if ($status < 200 || $status >= 300) {
    throw new RuntimeException("XPayr API {$status}: {$body}");
}
echo $body . PHP_EOL;
