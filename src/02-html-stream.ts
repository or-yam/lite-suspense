import type http from 'node:http';

/**
 * Simple stream of a HTML string.
 * (Server side render)
 */
export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const content = 'hello, world.';
  const payload = `
  <html>
    <div>
    ${content}
    </div>
  </html>
  `;

  res.write(payload);
  res.end();
}
