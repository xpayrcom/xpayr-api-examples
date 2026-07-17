import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const baseUrl = String(process.env.XPAYR_BASE_URL || "https://xpayr.com/api/v1").replace(/\/+$/, "");
const secretKey = String(process.env.XPAYR_TEST_SECRET_KEY || "");
const outputPath = String(process.env.XPAYR_SMOKE_OUTPUT || "artifacts/testnet-smoke.json");

assert.match(secretKey, /^sk_test_[A-Za-z0-9_-]{32,}$/, "XPAYR_TEST_SECRET_KEY must be a test key");
assert.match(baseUrl, /^https:\/\//, "XPAYR_BASE_URL must use HTTPS");

async function request(method, path, { body, authenticated = true } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(authenticated ? { Authorization: `Bearer ${secretKey}` } : {}),
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      "User-Agent": "XPayr-GitHub-Testnet-Smoke/1.0",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`${method} ${path} returned invalid JSON (${response.status})`);
  }
  if (!response.ok) {
    throw new Error(`${method} ${path} failed (${response.status} ${payload?.error?.code || "unknown"})`);
  }
  return { status: response.status, payload };
}

const health = await request("GET", "/health", { authenticated: false });
assert.equal(health.status, 200);

const networks = await request("GET", "/me/networks");
assert.equal(networks.payload?.livemode, false, "Test key must not expose live networks");
const arc = networks.payload?.data?.find((network) => network.network_key === "arc-testnet");
assert.ok(arc, "arc-testnet is missing from the test catalog");
assert.equal(arc.chain_id, 5042002);
assert.ok(arc.currencies?.some((currency) => currency.symbol === "USDC"), "Arc Testnet USDC is unavailable");

const orderId = `GH-SMOKE-${Date.now()}`;
const created = await request("POST", "/payments", {
  body: {
    amount: "0.001000",
    currency: "USDC",
    network: "arc-testnet",
    order_id: orderId,
    description: "GitHub Actions testnet smoke session",
    metadata: { source: "github-actions", purpose: "testnet-smoke" },
  },
});
assert.equal(created.status, 201);
assert.match(created.payload?.id || "", /^ps_[a-z0-9]+$/);
assert.equal(created.payload?.network, "arc-testnet");
assert.equal(created.payload?.currency, "USDC");
assert.equal(created.payload?.status, "pending");
assert.equal(created.payload?.livemode, false);
assert.match(created.payload?.payment_url || "", /^https:\/\/xpayr\.com\//);

const fetched = await request("GET", `/payments/${encodeURIComponent(created.payload.id)}`);
assert.equal(fetched.payload?.id, created.payload.id);
assert.equal(fetched.payload?.status, "pending");

const checkout = await fetch(created.payload.payment_url, {
  headers: { "User-Agent": "XPayr-GitHub-Testnet-Smoke/1.0" },
  signal: AbortSignal.timeout(20_000),
});
assert.equal(checkout.status, 200);
assert.match(await checkout.text(), /window\.AppConfig\s*=/, "Hosted checkout config was not rendered");

const evidence = {
  ok: true,
  checked_at: new Date().toISOString(),
  api_base_url: baseUrl,
  network: "arc-testnet",
  chain_id: 5042002,
  currency: "USDC",
  session_id: created.payload.id,
  payment_url: created.payload.payment_url,
  status: fetched.payload.status,
  live_funds_moved: false,
};
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, { mode: 0o600 });
console.log(JSON.stringify(evidence));
