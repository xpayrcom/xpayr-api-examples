export function buildPaymentRequest({
  amount,
  currency,
  network,
  orderId,
  description,
  successUrl,
  cancelUrl,
  callbackUrl,
  metadata = {},
}) {
  const normalizedAmount = String(amount ?? "").trim();
  const normalizedCurrency = String(currency ?? "").trim().toUpperCase();
  const normalizedNetwork = String(network ?? "").trim().toLowerCase();

  if (!/^\d+(?:\.\d+)?$/.test(normalizedAmount) || Number(normalizedAmount) <= 0) {
    throw new TypeError("amount must be a positive decimal string");
  }
  if (!/^[A-Z0-9]{2,12}$/.test(normalizedCurrency)) {
    throw new TypeError("currency is invalid");
  }
  if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(normalizedNetwork)) {
    throw new TypeError("network is invalid");
  }
  if (metadata === null || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new TypeError("metadata must be an object");
  }

  return Object.fromEntries(Object.entries({
    amount: normalizedAmount,
    currency: normalizedCurrency,
    network: normalizedNetwork,
    order_id: orderId,
    description,
    success_url: successUrl,
    cancel_url: cancelUrl,
    ipn_callback_url: callbackUrl,
    metadata,
  }).filter(([, value]) => value !== undefined && value !== null && value !== ""));
}
