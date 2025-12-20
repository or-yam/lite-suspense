import type http from 'node:http';
import { setTimeout } from 'node:timers/promises';

async function getPokemonComponent(id = 1) {
  await setTimeout(1000);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const { name, sprites } = data;

  return `
    <div>
      ${name}
      <img src=${sprites.front_default} />
    </div>`;
}

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
