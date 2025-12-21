import type http from 'node:http';
import { Awaiter, getPokemonComponent, replaceTemplate } from './utils.ts';

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
