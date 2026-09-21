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

## 2. `yield` — Pausing Execution

The `yield` keyword pauses a Generator at a specific point.

```js
function* foo() {
  console.log("A");

  yield;

  console.log("B");

  yield;

  console.log("C");
}
```

Execution happens step by step:

```js
const iterator = foo();

iterator.next(); // A
iterator.next(); // B
iterator.next(); // C
```

After reaching `yield`, the Generator pauses until the next `next()` call.

This allows a function to suspend and later resume its execution.

---

## 3. The `next()` Result

Every call to `next()` returns an object containing `value` and `done`.

```js
function* foo() {
  yield 1;
  yield 2;
  return 3;
}

const iterator = foo();

iterator.next();
// { value: 1, done: false }

iterator.next();
// { value: 2, done: false }

iterator.next();
// { value: 3, done: true }
```

* `value` contains the yielded or returned value.
* `done` indicates whether the Generator has finished.
