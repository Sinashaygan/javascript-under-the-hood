## 1. Asynchrony: Now & Later

Asynchronous programming is about handling work that is split across time.

A program may execute one part **now** and another part **later**, with a time gap between them.

Common examples include:

- User input
- Network requests
- Timers
- File or database operations
- Animations

The key idea is:

```text
Now → time gap → Later

## 2. A Program in Chunks

A JavaScript program can be thought of as a collection of chunks, most commonly functions.

Some chunks execute immediately, while others are scheduled to execute later.

Example:

```js
function now() {
  return 21;
}

function later() {
  answer = answer * 2;
  console.log("Meaning of life:", answer);
}

var answer = now();

setTimeout(later, 1000);
```

