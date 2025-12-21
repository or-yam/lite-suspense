import type http from 'node:http';
import { getPokemonComponent } from './utils.ts';

/**
 * Fetch and render of a Pokemon component.
 * All data is fetched before sending the response.
 * (Blocking server side render)
 */
export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const content = await getPokemonComponent();
  const payload = `
  <html>
    <h1>Pokemon</h1>
    <div>
    ${content}
    </div>
  </html>
  `;

  res.write(payload);
  res.end();
}
