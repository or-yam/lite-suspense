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

function replaceTemplate(id: string) {
  const container = document.querySelector<HTMLDivElement>(`div[data-suspense-id=${JSON.stringify(id)}]`);
  const template = document.querySelector<HTMLTemplateElement>(`template[data-suspense-id=${JSON.stringify(id)}]`);
  const templateContent = template?.content.querySelector('div');

  if (!container || !templateContent || !template) {
    console.log('Shit!');
    return;
  }

  container.outerHTML = templateContent.innerHTML;
  template.remove();
}

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
