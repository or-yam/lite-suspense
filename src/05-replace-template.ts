import type http from 'node:http';
import { getPokemonComponent, replaceTemplate } from './utils.ts';

export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const content = getPokemonComponent();
  const suspenseId = 'sus';
  const fallback = `<div data-suspense-id=${suspenseId}>Loading...</div>`;
  const payload = `
  <html>
    <h1>Pokemon</h1>
    <div>
    ${fallback}
    </div>
  </html>
  `;

  res.write(payload);

  const template = `
  <template data-suspense-id=${suspenseId}>
    ${await content}
  </template>`;

  res.write(template);

  const script = `
  <script>
    (${replaceTemplate})('${suspenseId}')
  </script>`;

  res.write(script);

  res.end();
}
