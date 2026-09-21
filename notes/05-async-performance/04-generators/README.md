# You Don't Know JS Yet — Async & Performance

## Chapter 4: Generators

Generators provide a way to pause and resume the execution of a function. They are especially useful for understanding asynchronous flow and the concepts that eventually led to `async/await`.

---

## 1. Generator Functions

A Generator function is declared using `function*`.

```js
function* foo() {
  console.log("Hello");
}
```

Calling a Generator function does not immediately execute its body. Instead, it returns a Generator object that can be controlled with `next()`.

```js
const iterator = foo();

iterator.next();
```

The Generator starts running only when `next()` is called.

---
