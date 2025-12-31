import type http from 'node:http';
import { setTimeout } from 'node:timers/promises';

/**
 * Simple http req res
 */
async function example(req: http.IncomingMessage, res: http.ServerResponse) {
  //*  with express it would be res.send('hello world');
  res.end('hello world');
}

/**
 * Simple stream of a string with a delay.
 */
export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  res.write('hello, ');
  await setTimeout(2000);
  res.write('world.');

  res.end();
}
