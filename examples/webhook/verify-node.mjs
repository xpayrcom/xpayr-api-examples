import { verifyWebhook } from "../../src/webhook.mjs";

export function handleXPayrWebhook(rawBody, headers, secret) {
  const signature = headers["x-xpayr-signature"] || headers["X-XPayr-Signature"];
  if (!verifyWebhook(rawBody, signature, secret)) throw new Error("Invalid XPayr webhook signature");
  return JSON.parse(rawBody);
}
