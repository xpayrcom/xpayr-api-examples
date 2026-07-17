import crypto from "node:crypto";

export function verifyWebhook(rawBody, signatureHeader, secret) {
  const received = String(signatureHeader ?? "").replace(/^sha256=/i, "").trim();
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (!/^[a-f0-9]{64}$/i.test(received)) return false;
  return crypto.timingSafeEqual(Buffer.from(received, "hex"), Buffer.from(expected, "hex"));
}
