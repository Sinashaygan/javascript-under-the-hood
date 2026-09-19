# You Don't Know JS Yet — Async & Performance

## Chapter 2: Callbacks

Callbacks are one of the fundamental mechanisms for handling asynchronous operations in JavaScript. However, as applications become more complex, callbacks introduce problems such as difficult control flow, inversion of control, and error-handling complexity.

## 1. Continuations

A callback can represent the **continuation** of a program — the part that should run later after an asynchronous operation completes.

```js
ajax("http://some.url", function response(data) {
  console.log(data);
});

console.log("Continue...");

The callback does not execute immediately. The program continues, and the callback runs later when the asynchronous operation completes.

Key idea
Current execution → Async operation → Callback / Continuation