const baseUrl = process.env.XPAYR_BASE_URL || "https://xpayr.com/api/v1";
const secretKey = process.env.XPAYR_SECRET_KEY;
const paymentId = process.env.XPAYR_PAYMENT_ID;
if (!secretKey || !paymentId) throw new Error("Set XPAYR_SECRET_KEY and XPAYR_PAYMENT_ID");

const response = await fetch(`${baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
  headers: { Authorization: `Bearer ${secretKey}` },
});
const payload = await response.json();
if (!response.ok) throw new Error(`XPayr API ${response.status}: ${JSON.stringify(payload)}`);
console.log(JSON.stringify(payload, null, 2));
