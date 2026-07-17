import json
import os
import urllib.error
import urllib.request

base_url = os.getenv("XPAYR_BASE_URL", "https://xpayr.com/api/v1").rstrip("/")
secret_key = os.getenv("XPAYR_SECRET_KEY")
if not secret_key:
    raise RuntimeError("Set XPAYR_SECRET_KEY to an sk_test_* key")

payload = json.dumps({
    "amount": "49.90",
    "currency": "USDC",
    "network": "bsc-testnet",
    "order_id": "ORDER-1001",
    "description": "Test checkout",
    "metadata": {"source": "xpayr-api-examples"},
}).encode("utf-8")

request = urllib.request.Request(
    f"{base_url}/payments",
    data=payload,
    headers={"Authorization": f"Bearer {secret_key}", "Content-Type": "application/json"},
    method="POST",
)

try:
    with urllib.request.urlopen(request, timeout=20) as response:
        print(response.read().decode("utf-8"))
except urllib.error.HTTPError as error:
    raise RuntimeError(f"XPayr API {error.code}: {error.read().decode('utf-8')}") from error
