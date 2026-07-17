# XPayr API Examples

[![CI](https://github.com/xpayrcom/xpayr-api-examples/actions/workflows/ci.yml/badge.svg)](https://github.com/xpayrcom/xpayr-api-examples/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](LICENSE)

Production-oriented examples for XPayr payment sessions, hosted checkout, webhooks, and testnet-first merchant integrations.

> **Status:** Public reference implementation

## Purpose

Copy-paste examples for teams evaluating or integrating the XPayr Merchant API without adopting an SDK first.

## Included

- cURL, Node.js, PHP, and Python payment-session examples
- Payment status and reconciliation examples
- Webhook signature verification and idempotency guidance

## Quick start

```bash
cp .env.example .env
# Set XPAYR_SECRET_KEY to a test key, then choose an example under examples/.
```

Use an XPayr test key before live credentials. Never expose `sk_test_*`, `sk_live_*`, agent keys, webhook secrets, or wallet private keys in browser code or commits.

## Documentation

- [Developer Hub](https://xpayr.com/developers)
- [Merchant API documentation](https://xpayr.com/doc-api)
- [Testnet checkout guide](https://xpayr.com/developers/testnet-checkout-api)
- [Webhook signature guide](https://xpayr.com/developers/webhook-signature-guide)

## Security

Read [SECURITY.md](SECURITY.md) before reporting a vulnerability. Payment completion must be based on verified XPayr webhook/API state and canonical on-chain evidence, not browser callbacks alone.

## Live testnet verification

The `XPayr Testnet smoke` workflow uses a restricted `sk_test_*` repository-environment secret and a dedicated low-balance Arc Testnet wallet. It validates the live network catalog, creates a `0.001000 USDC` session, reads the session back, renders hosted checkout, completes that exact session through the pinned XPayr lifecycle action, verifies the `PaymentSplit` event and balance deltas, and requires both backend and public status to reconcile as `completed`. Mainnet is hard-disabled and the secret-free evidence artifact is retained for 14 days.

## License

MIT. See [LICENSE](LICENSE).
