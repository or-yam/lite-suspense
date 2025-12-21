import { setTimeout } from 'node:timers/promises';

/**
 *
 * Fetch Pokemon component with a delay.
 * @param id Pokemon ID
 * @return HTML string of the Pokemon component
 */
export async function getPokemonComponent(id = 1) {
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

/**
 * Replace the fallback container with the content from the template.
 * @param id Suspense ID
 */
export function replaceTemplate(id: string) {
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

export class Awaiter {
  promises: Promise<unknown>[] = [];
  push(promise: Promise<unknown>) {
    this.promises.push(promise);
  }
  async awaitAll() {
    while (this.promises.length) {
      const promises = this.promises;
      this.promises = [];
      await Promise.allSettled(promises);
    }
  }
}
