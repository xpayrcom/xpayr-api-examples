<div align="center">
  <a href="https://xpayr.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://xpayr.com/public/images/xpayr-logo-white.png" />
      <source media="(prefers-color-scheme: light)" srcset="https://xpayr.com/public/images/xpayr-logo-black.png" />
      <img src="https://xpayr.com/public/images/xpayr-logo-white.png" alt="XPayr Official Logo" width="220" />
    </picture>
  </a>
  <p>
    <a href="https://xpayr.com"><img src="https://xpayr.com/partner-badge.php?type=powered_by&theme=dark" alt="Powered by XPayr" height="28" /></a>
    <a href="https://mcp.xpayr.com"><img src="https://img.shields.io/badge/MCP_Portal-mcp.xpayr.com-029bfd?style=for-the-badge" alt="XPayr MCP Portal" height="28" /></a>
    <a href="https://docs.xpayr.com"><img src="https://img.shields.io/badge/Docs-docs.xpayr.com-10b981?style=for-the-badge" alt="XPayr Docs" height="28" /></a>
    <a href="https://www.npmjs.com/package/@xpayr/mcp-server"><img src="https://img.shields.io/npm/v/@xpayr/mcp-server?style=for-the-badge&color=cb3837&label=MCP%20NPM" alt="NPM @xpayr/mcp-server" height="28" /></a>
  </p>
  <p>
    <a href="https://xpayr.com"><b>Official Website</b></a> •
    <a href="https://mcp.xpayr.com"><b>AI &amp; MCP Portal (21 Tools)</b></a> •
    <a href="https://docs.xpayr.com"><b>Developer Docs</b></a> •
    <a href="https://xpayr.com/developers"><b>Developer Hub</b></a> •
    <a href="https://xpayr.com/tools/crypto-payment-fee-calculator"><b>0.5% Fee Calculator</b></a>
  </p>
</div>

---

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
