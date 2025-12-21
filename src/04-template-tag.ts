import type http from 'node:http';
import { getPokemonComponent } from './utils.ts';

/**
 * Rendering fallback content while fetching data for the Pokemon component.
 * Non-blocking server side render with template tag.
 * Content is only rendered in the template element when data is ready.
 */
export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const content = getPokemonComponent();
  const fallback = `<div>Loading...</div>`;
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
  <template>
    ${await content}
  </template>`;

  res.write(template);

  res.end();
}
