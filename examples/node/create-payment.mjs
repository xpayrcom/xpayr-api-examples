import { buildPaymentRequest } from "../../src/payment-request.mjs";

const baseUrl = process.env.XPAYR_BASE_URL || "https://xpayr.com/api/v1";
const secretKey = process.env.XPAYR_SECRET_KEY;
if (!secretKey) throw new Error("Set XPAYR_SECRET_KEY to an sk_test_* key");

const response = await fetch(`${baseUrl}/payments`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(buildPaymentRequest({
    amount: "49.90",
    currency: "USDC",
    network: "bsc-testnet",
    orderId: "ORDER-1001",
    description: "Test checkout",
    metadata: { source: "xpayr-api-examples" },
  })),
});

const payload = await response.json();
if (!response.ok) throw new Error(`XPayr API ${response.status}: ${JSON.stringify(payload)}`);
console.log(JSON.stringify({ id: payload.id, payment_url: payload.payment_url, status: payload.status }, null, 2));
