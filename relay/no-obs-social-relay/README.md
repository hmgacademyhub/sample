# ClassDeck No-OBS Social Relay

This optional relay makes **direct tablet social streaming without OBS** possible.

## Why this relay exists

A static browser app can capture and send media using WebRTC, but YouTube, Facebook, Instagram and TikTok generally expect **RTMP/RTMPS ingest** for external encoders. Browsers cannot open RTMP sockets directly. This relay receives ClassDeck's WebRTC/WHIP stream and forwards it to social platforms through FFmpeg.

Flow:

```text
ClassDeck tablet browser → WebRTC/WHIP → SRS relay → FFmpeg → YouTube/Facebook/Instagram/TikTok RTMP
```

No OBS is required on the tablet.

## Components

- `SRS` — receives WebRTC/WHIP from ClassDeck and exposes a local RTMP stream.
- `controller` — small Node.js service that starts/stops FFmpeg outputs.
- `Caddy` — HTTPS reverse proxy. Browsers require HTTPS for microphone/camera/WebRTC.

## Requirements

- A Linux VPS/VM with Docker and Docker Compose.
- A domain or subdomain pointing to the server, e.g. `live.yourdomain.com`.
- Open ports 80, 443, and UDP 8000.
- Social platform RTMP/RTMPS publish URLs/keys.

Free/low-cost options include Oracle Cloud Always Free VM or any existing school/church/business VPS. GitHub Pages alone cannot run this relay because GitHub Pages is static hosting only.

## Quick deployment

1. Point DNS:

```text
live.yourdomain.com → YOUR_SERVER_IP
```

2. SSH into your server:

```bash
git clone https://github.com/YOUR-USERNAME/hmgacademyclassdeck.git
cd hmgacademyclassdeck/relay/no-obs-social-relay
cp .env.example .env
nano .env
```

3. Set:

```text
DOMAIN=live.yourdomain.com
RELAY_SECRET=choose-a-long-private-secret
PUBLIC_IP=YOUR_SERVER_PUBLIC_IP
```

4. Start:

```bash
docker compose up -d --build
```

5. Test health:

```bash
curl https://live.yourdomain.com/health
```

Expected:

```json
{"ok":true,"service":"classdeck-relay"}
```

6. In ClassDeck on your tablet:

```text
teach.html → ⚙ Settings → 📡 Tablet Live
```

- Gateway URL: `https://live.yourdomain.com`
- Relay secret: the same `RELAY_SECRET`
- Stream name: e.g. `classdeck`
- Paste full RTMP/RTMPS URLs from social platforms
- Start tablet social live

## WHIP endpoint pattern

ClassDeck publishes to:

```text
https://live.yourdomain.com/rtc/v1/whip/?app=live&stream=STREAM_NAME
```

SRS then makes it available internally to FFmpeg as:

```text
rtmp://srs:1935/live/STREAM_NAME
```

## Security notes

- Use HTTPS.
- Keep `RELAY_SECRET` private.
- Never commit stream keys to GitHub.
- Use firewall rules where possible.
- Public streaming classes involving minors requires consent and safeguarding rules.

## Troubleshooting

### Browser says relay not reachable

- Check DNS.
- Check Caddy logs: `docker compose logs caddy`.
- Check firewall ports 80/443 and UDP 8000.

### Social platform receives no video

- Check controller logs: `docker compose logs controller`.
- Confirm the full RTMP/RTMPS publish URL includes the stream key.
- Confirm the platform is waiting for an encoder signal.

### TikTok/Instagram not working

- Confirm your account has Live Producer/RTMP access.
- Generate a fresh key for each live session if required.
- Use vertical output in ClassDeck Tablet Live for TikTok/Instagram.

## Cost discipline

This relay uses open-source tools and no AI API. The only possible cost is the server/VM if you do not already have a free-tier server.
