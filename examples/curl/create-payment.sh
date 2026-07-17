#!/usr/bin/env sh
set -eu

: "${XPAYR_BASE_URL:=https://xpayr.com/api/v1}"
: "${XPAYR_SECRET_KEY:?Set XPAYR_SECRET_KEY to an sk_test_* key}"

curl --fail-with-body --silent --show-error \
  --request POST "$XPAYR_BASE_URL/payments" \
  --header "Authorization: Bearer $XPAYR_SECRET_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "amount": "49.90",
    "currency": "USDC",
    "network": "bsc-testnet",
    "order_id": "ORDER-1001",
    "description": "Test checkout",
    "metadata": {"source": "xpayr-api-examples"}
  }'
