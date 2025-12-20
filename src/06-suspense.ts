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
  console.log('hi');
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

class Awaiter {
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

export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const awaiter = new Awaiter();
  let suspenseId = 0;
  const content = getPokemonComponent(52);
  const fallback = 'Loading...';

  function suspense(htmlPromise: Promise<string>, fallback: string): string {
    const id = String(++suspenseId);
    const promise = (async () => {
      const template = `<template data-suspense-id=${id}>${await htmlPromise}</template>`;
      res.write(template);

      const script = `<script>(${replaceTemplate})(${JSON.stringify(id)})</script>`;
      res.write(script);
    })();

    awaiter.push(promise);

    const placeholder = `<div data-suspense-id=${id}>${fallback}</div>`;
    return placeholder;
  }

  const payload = `
  <html>
    <h1>Pokemon</h1>
    <div>
       ${suspense(content, fallback)}
    </div>
  </html>
  `;

  res.write(payload);

  await awaiter.awaitAll();
  res.end();
}
