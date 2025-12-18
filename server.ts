import http from 'node:http';
import listenerFunction from './index.ts';

const HOST = '127.0.0.1' as const;
const PORT = 3001 as const;

const server = http.createServer(listenerFunction);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
