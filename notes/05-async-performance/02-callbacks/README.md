# You Don't Know JS Yet — Async & Performance

## Chapter 2: Callbacks

Callbacks are one of the fundamental mechanisms for handling asynchronous operations in JavaScript. However, as applications become more complex, callbacks introduce problems such as difficult control flow, inversion of control, and error-handling complexity.

---

## 1. Continuations

A callback can represent the **continuation** of a program — the part that should run later after an asynchronous operation completes.

```js
ajax("http://some.url", function response(data) {
  console.log(data);
});

console.log("Continue...");
```

The callback does not execute immediately. The program continues, and the callback runs later when the asynchronous operation completes.

### Key idea

```text
Current execution → Async operation → Callback / Continuation
```

---

## 2. Sequential Thinking vs Asynchronous Flow

Humans usually think about programs sequentially:

```text
A → B → C
```

But asynchronous JavaScript can execute code in a different order:

```js
doA(function () {
  doB();
});

doC();
```

The actual execution may be:

```text
doA()
  ↓
doC()
  ↓
doB()
```

The order in which code is written does not always represent the order in which asynchronous code executes.

---

## 3. Callback Hell

Callback Hell is not simply about deeply nested callbacks.

The deeper problem is that asynchronous control flow becomes difficult to understand and maintain.

```js
doA(function () {
  doB(function () {
    doC(function () {
      doD();
    });
  });
});
```

As the number of asynchronous operations grows, we have to reason about:

* Execution order
* Error handling
* Dependencies
* Retry logic
* Different execution paths

### Important

> Callback Hell is mainly a **control-flow problem**, not just an indentation problem.

---

## 4. Inversion of Control

When we pass a callback to another function, we give that function control over **when and how** our callback will be executed.

```js
someLibrary(data, function callback(result) {
  // continuation
});
```

Now `someLibrary()` controls the execution of our callback.

This is called **Inversion of Control (IoC)**.

We have to trust the external code to:

* Call the callback
* Call it at the correct time
* Call it only when appropriate
* Provide the correct data
* Handle errors correctly

---

## 5. Callback Trust Issues

A callback-based API can potentially cause several problems.

The callback might:

```text
Never be called
Be called too early
Be called too late
Be called more than once
Receive incorrect data
Fail to report errors
```

For example:

```js
analytics.trackPurchase(data, function () {
  chargeCreditCard();
});
```

If the callback is accidentally invoked multiple times, the operation could also happen multiple times.

---

## 6. Protecting Against Multiple Calls

One possible workaround is a **latch**:

```js
var called = false;

someAsyncOperation(function () {
  if (!called) {
    called = true;

    doSomething();
  }
});
```

Now the callback logic can only execute once.

However, this does not solve every callback problem.

For example, what happens if the callback is never called?

---

## 7. Success and Failure Callbacks

A common pattern is to provide separate callbacks for success and failure.

```js
ajax(
  "http://some.url",
  function success(data) {
    console.log(data);
  },
  function failure(err) {
    console.error(err);
  }
);
```

This makes error handling clearer, but the API still depends on the callback mechanism behaving correctly.

---

## 8. Error-First Callbacks

Node.js popularized the **error-first callback** pattern.

```js
function response(err, data) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
}
```

The convention is:

```text
callback(error, data)
```

If an error occurs:

```js
err
```

contains the error.

If the operation succeeds:

```js
data
```

contains the result.

This provides a standard way to handle success and failure.

---

## 9. The Sync vs Async Problem

One dangerous situation occurs when an API sometimes calls a callback synchronously and sometimes asynchronously.

```js
var a = 0;

someAPI(function () {
  console.log(a);
});

a++;
```

If the callback runs synchronously:

```text
0
```

If it runs asynchronously:

```text
1
```

This difference can change program behavior.

### Important rule

A callback-based API should consistently define whether callbacks are synchronous or asynchronous.

---

## 10. Zalgo

**Zalgo** describes the problematic situation where a function may invoke a callback either synchronously or asynchronously.

```text
Sometimes:
API → callback

Sometimes:
API → later → callback
```

This makes the program difficult to reason about because the timing of the callback is unpredictable.

Consistent asynchronous behavior is safer.

---

## 11. asyncify

One way to force a callback to execute asynchronously is to defer it.

A simplified implementation:

```js
function asyncify(fn) {
  return function (...args) {
    setTimeout(() => {
      fn(...args);
    }, 0);
  };
}
```

Now:

```js
someAPI(asyncify(callback));
```

ensures that `callback` runs asynchronously.

---

## 12. Why Callback Workarounds Are Not Enough

We can create solutions for individual callback problems:

```text
Multiple calls → Latch
Never called → Timeout
Errors → Error-first callback
Sync/Async inconsistency → asyncify
```

But each solution adds more code and complexity.

Eventually the application can become full of:

* Callback nesting
* Error handling
* State tracking
* Timeouts
* Retry logic
* Defensive checks

This is one of the reasons JavaScript needed a better abstraction for asynchronous programming.

---

## 13. The Need for Promises

Callbacks are useful, but they have limitations.

The main problems are:

```text
Callbacks
   ↓
Continuation passing
   ↓
Inversion of Control
   ↓
Trust issues
   ↓
Complex control flow
   ↓
More boilerplate
```

Promises provide a different abstraction for representing the eventual result of an asynchronous operation.

Instead of:

```js
doSomething(function (result) {
  console.log(result);
});
```

we can eventually write:

```js
doSomething()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
```

Promises are therefore introduced as a way to manage asynchronous control flow more reliably.

---

# Key Takeaways

* A callback can represent a **continuation** of a program.
* Asynchronous execution does not necessarily follow the order in which code is written.
* Callback Hell is mainly a **control-flow and reasoning problem**.
* Passing callbacks creates **Inversion of Control**.
* Callback-based APIs introduce **trust issues**.
* Callbacks may execute too early, too late, multiple times, or never.
* Error-first callbacks provide a common error-handling convention.
* Mixing synchronous and asynchronous callbacks can create unpredictable behavior.
* **Zalgo** refers to APIs that may invoke callbacks synchronously or asynchronously.
* Workarounds can reduce individual callback problems but often increase complexity.
* These limitations motivate the use of **Promises** for asynchronous programming.

## Chapter Flow

```text
Callbacks
    ↓
Continuations
    ↓
Asynchronous Control Flow
    ↓
Callback Hell
    ↓
Inversion of Control
    ↓
Trust Issues
    ↓
Error Handling / Latches / Timeouts
    ↓
Sync vs Async / Zalgo
    ↓
Need for a Better Abstraction
    ↓
Promises
```
