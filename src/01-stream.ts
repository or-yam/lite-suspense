import type http from 'node:http';
import { setTimeout } from 'node:timers/promises';

export default async function (req: http.IncomingMessage, res: http.ServerResponse) {
  res.write('hello, ');
  await setTimeout(2000);
  res.write('world.');

  res.end();
}
