# HMG ClassDeck License Gateway — stronger subscription protection

This optional Cloudflare Worker makes subscription checks server-side instead of relying only on localStorage/offline keys.

## Why you need it

A purely static JavaScript app can be copied and modified by a determined attacker. Strong subscription enforcement requires a server-side authority. This Worker is free-tier friendly and gives you:

- Central subscription verification.
- Server-side trial start date.
- Device limits per license.
- Email blocking/suspension.
- Short-lived entitlement leases.
- Admin endpoints for adding licenses and blocking accounts.

## Deploy

1. Install Wrangler:

```bash
npm install -g wrangler
wrangler login
```

2. Create a KV namespace:

```bash
wrangler kv namespace create LICENSE_KV
```

3. Copy config:

```bash
cp wrangler.toml.example wrangler.toml
```

4. Paste the KV namespace id into `wrangler.toml`.

5. Set admin secret:

```bash
wrangler secret put ADMIN_SECRET
```

6. Deploy:

```bash
wrangler deploy
```

7. Copy the Worker URL, e.g.:

```text
https://hmg-classdeck-license-gateway.YOUR.workers.dev
```

8. In the static ClassDeck app, edit:

```text
js/security-config.js
```

Set:

```js
window.HMG_SECURITY = {
  licenseGateway: "https://hmg-classdeck-license-gateway.YOUR.workers.dev",
  licenseMode: "strict",
  leaseMinutes: 30,
  heartbeatMinutes: 5
};
```

Use `strict` for best revenue protection. Use `hybrid` only if you want offline local-key fallback.

## Add a license

```bash
curl -X POST https://YOUR-WORKER/api/admin/license \
  -H "content-type: application/json" \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -d '{
    "key":"HMG-202612-ABCDEF1234",
    "email":"teacher@example.com",
    "name":"Teacher Name",
    "expires":"2026-12-31",
    "devices":2,
    "plan":"teacher",
    "status":"active"
  }'
```

## Block an account

```bash
curl -X POST https://YOUR-WORKER/api/admin/block \
  -H "content-type: application/json" \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -d '{"email":"badteacher@example.com","reason":"refund/abuse"}'
```

## Limitations

This protects your official hosted platform. No static JavaScript can stop someone who downloads the whole code, removes the auth checks and hosts an illegal clone under their own domain. To reduce that risk:

- Keep the license gateway in strict mode.
- Keep live/social relay secrets private.
- Use forensic watermarking.
- Monitor audit logs.
- Use takedown requests for cloned deployments.
