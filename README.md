# Naive implementation of React's SSR Suspense

## Inspired (copied 😅) from [Gal Schlezinger](https://github.com/Schniz) [talk](https://www.youtube.com/watch?v=yia1zS7EgCw) on [javascript israel](https://www.youtube.com/@javascriptisrael)

### Things to note

- `curl` and browser client buffer the response so you will not get the timeout effect by default
to avoid it you need to use `curl -N` to disable buffering
or do a `\n` in the end of a string.

another option is to right the header before:

```js
res.writeHead(200, {
  "Content-Type": "text/plain",
});
res.flushHeaders();
```

- `template` HTML element has a special [content property](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template#usage_notes), and its childe nodes are there. (unless you create it with appendChild)
