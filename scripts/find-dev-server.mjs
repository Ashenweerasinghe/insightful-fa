/**
 * Probes localhost ports for the running Next.js dev server that serves the
 * current hero V2 copy ("See the bear?"). Reports the matching port.
 */
import { request } from "node:http";

const PORTS = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 5173, 8080];
const NEEDLE = "See the bear";

function fetchHome(port) {
  return new Promise((resolve) => {
    const req = request(
      { hostname: "localhost", port, path: "/", method: "GET", timeout: 3000 },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c.toString()));
        res.on("end", () => {
          const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
          const h1Text = h1Match
            ? h1Match[1]
                .replace(/<[^>]+>/g, "")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 80)
            : null;
          resolve({
            port,
            status: res.statusCode,
            hit: body.includes(NEEDLE),
            h1: h1Text,
            location: res.headers.location,
            server: res.headers["x-powered-by"] ?? res.headers.server,
          });
        });
      },
    );
    req.on("error", (e) => resolve({ port, status: 0, err: e.code }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ port, status: 0, err: "timeout" });
    });
    req.end();
  });
}

const results = await Promise.all(PORTS.map(fetchHome));
for (const r of results) {
  const tag = r.hit ? "MATCH" : r.status ? `${r.status}` : `(${r.err})`;
  const h1 = r.h1 ? ` h1="${r.h1}"` : "";
  const loc = r.location ? ` → ${r.location}` : "";
  const srv = r.server ? ` [${r.server}]` : "";
  console.log(`localhost:${r.port}  ${tag}${srv}${loc}${h1}`);
}
const match = results.find((r) => r.hit);
console.log(match ? `\nuse port ${match.port}` : `\nno match found`);
