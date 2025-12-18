curl and browser client buffer the response so you will not get the timeout effect by default
to avoid it you need to use `curl -N` to disable buffering
or do a `\n` in the end of a string.

another option is to right the header before:

```js
res.writeHead(200, {
  "Content-Type": "text/plain",
});
res.flushHeaders();
```
