import http from 'node:http';
import { spawn } from 'node:child_process';

const PORT = Number(process.env.PORT || 3000);
const SECRET = process.env.RELAY_SECRET || '';
const SRS_RTMP = (process.env.SRS_RTMP || 'rtmp://srs:1935/live').replace(/\/+$/, '');
const jobs = new Map(); // stream -> [{name, child}]

function send(res, code, obj) {
  const body = typeof obj === 'string' ? obj : JSON.stringify(obj);
  res.writeHead(code, {
    'content-type': typeof obj === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type,x-relay-secret',
  });
  res.end(body);
}
function authed(req) {
  if (!SECRET) return true;
  return req.headers['x-relay-secret'] === SECRET;
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 200_000) reject(new Error('body too large')); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}
function safeStream(s) {
  return String(s || 'classdeck').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80) || 'classdeck';
}
function stopStream(stream) {
  const arr = jobs.get(stream) || [];
  for (const j of arr) {
    try { j.child.kill('SIGTERM'); } catch {}
  }
  jobs.delete(stream);
}
function startOutput(stream, dest) {
  const publishUrl = String(dest.publishUrl || '').trim();
  const name = String(dest.name || 'custom').slice(0, 40);
  if (!/^rtmps?:\/\//i.test(publishUrl)) throw new Error(`Invalid RTMP URL for ${name}`);
  const input = `${SRS_RTMP}/${stream}`;
  const args = [
    '-hide_banner', '-loglevel', 'warning',
    '-re', '-i', input,
    '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency',
    '-pix_fmt', 'yuv420p', '-r', '30', '-g', '60',
    '-b:v', '2500k', '-maxrate', '2500k', '-bufsize', '5000k',
    '-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-ac', '2',
    '-f', 'flv', publishUrl,
  ];
  const child = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
  child.stderr.on('data', (d) => console.log(`[${stream}:${name}] ${String(d).trim()}`));
  child.on('exit', (code, sig) => console.log(`[${stream}:${name}] ffmpeg exited code=${code} sig=${sig}`));
  return { name, child };
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, '');
  if (req.url === '/health') return send(res, 200, { ok: true, service: 'classdeck-relay', activeStreams: [...jobs.keys()] });
  if (!authed(req)) return send(res, 401, { ok: false, error: 'unauthorized' });
  try {
    if (req.url === '/api/start' && req.method === 'POST') {
      const body = await readJson(req);
      const stream = safeStream(body.stream);
      const destinations = Array.isArray(body.destinations) ? body.destinations.filter((d) => d && d.publishUrl) : [];
      stopStream(stream);
      const started = destinations.map((d) => startOutput(stream, d));
      jobs.set(stream, started);
      return send(res, 200, { ok: true, stream, outputs: started.map((x) => x.name), input: `${SRS_RTMP}/${stream}` });
    }
    if (req.url === '/api/stop' && req.method === 'POST') {
      const body = await readJson(req);
      const stream = safeStream(body.stream);
      stopStream(stream);
      return send(res, 200, { ok: true, stream, stopped: true });
    }
    if (req.url === '/api/status') {
      return send(res, 200, { ok: true, jobs: [...jobs.entries()].map(([stream, arr]) => ({ stream, outputs: arr.map((x) => x.name) })) });
    }
    return send(res, 404, { ok: false, error: 'not found' });
  } catch (e) {
    console.error(e);
    return send(res, 500, { ok: false, error: e.message || 'server error' });
  }
});

process.on('SIGTERM', () => { for (const s of jobs.keys()) stopStream(s); process.exit(0); });
server.listen(PORT, () => console.log(`ClassDeck relay controller listening on ${PORT}`));
