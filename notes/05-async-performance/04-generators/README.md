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

## 4. Two-Way Communication

`yield` can send a value out of the Generator, while `next(value)` can send a value back into the Generator.

```js
function* foo() {
  const name = yield "What is your name?";

  console.log("Hello", name);
}

const iterator = foo();

console.log(iterator.next());
// { value: "What is your name?", done: false }

iterator.next("Sina");
// Hello Sina
```

The value passed to `next("Sina")` becomes the result of the paused `yield` expression.

Conceptually:

```text
Generator
    │
    │ yield value
    ↓
Outside Code
    │
    │ next(value)
    ↓
Generator
```

The first `next()` normally starts the Generator. The value passed to the first `next()` is not received by a `yield`.

---

## 5. `throw()` — Injecting Errors

The `throw()` method injects an error into the Generator at its current paused position.

```js
function* foo() {
  try {
    const value = yield "Waiting...";

    console.log(value);
  }
  catch (error) {
    console.log("Error:", error.message);
  }
}

const iterator = foo();

iterator.next();

iterator.throw(new Error("Something went wrong"));
```

The error enters the Generator at the point where it was paused and can be handled with `try/catch`.

---

## 6. `return()` — Terminating a Generator

The `return()` method immediately terminates a Generator.

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = foo();

iterator.next();
// { value: 1, done: false }

iterator.return("Finished");
// { value: "Finished", done: true }

iterator.next();
// { value: undefined, done: true }
```

`return()` can also trigger a `finally` block, making it useful for cleanup.

```js
function* foo() {
  try {
    yield 1;
    yield 2;
  }
  finally {
    console.log("Cleanup");
  }
}

const iterator = foo();

iterator.next();
iterator.return();

// Cleanup
```

The three important control operations are:

```text
next(value)     → Resume execution
throw(error)    → Inject an error
return(value)   → Terminate execution
```

## 7. Generators as Iterators

Generators produce Iterator objects.

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

const iterator = numbers();

iterator.next(); // 10
iterator.next(); // 20
iterator.next(); // 30
```

Generators can also be used with `for...of`.

```js
for (const number of numbers()) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

Generators can produce values lazily, meaning values are generated only when requested.

---

## 8. Infinite Generators

A Generator can produce values indefinitely.

```js
function* infinite() {
  let i = 0;

  while (true) {
    yield i++;
  }
}

const iterator = infinite();

iterator.next().value; // 0
iterator.next().value; // 1
iterator.next().value; // 2
```

Because execution is paused at each `yield`, an infinite Generator does not continuously run.
