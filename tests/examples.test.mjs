import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";
import { buildPaymentRequest } from "../src/payment-request.mjs";
import { verifyWebhook } from "../src/webhook.mjs";

test("buildPaymentRequest normalizes canonical API fields", () => {
  assert.deepEqual(buildPaymentRequest({ amount: "49.90", currency: "usdc", network: "BSC-TESTNET", metadata: { order: 1 } }), {
    amount: "49.90",
    currency: "USDC",
    network: "bsc-testnet",
    metadata: { order: 1 },
  });
});

test("buildPaymentRequest rejects floating garbage", () => {
  assert.throws(() => buildPaymentRequest({ amount: "49.90 USD", currency: "USDC", network: "bsc-testnet" }));
});

test("verifyWebhook accepts only the matching HMAC", () => {
  const body = Buffer.from('{"event":"payment.completed"}');
  const signature = crypto.createHmac("sha256", "secret").update(body).digest("hex");
  assert.equal(verifyWebhook(body, `sha256=${signature}`, "secret"), true);
  assert.equal(verifyWebhook(body, signature, "wrong"), false);
});
