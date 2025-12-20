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
