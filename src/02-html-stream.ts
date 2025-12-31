import type http from 'node:http';

/**
 * Simple stream of a HTML string.
 * (Server side render)
 */
export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const content = 'hello, world.';
  const buttonElement = `<button>Click me</button>`;

  const payload = `
  <html>
    <div>
    ${content}
    ${buttonElement}
    </div>
  </html>
  `;

  res.write(payload);
  res.end();
}
