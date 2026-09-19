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

## 2. Sequential Thinking vs Asynchronous Flow

Humans usually think about programs sequentially:

```text
A → B → C


## 2. Sequential Thinking vs Asynchronous Flow

Humans usually think about programs sequentially:

```text
A → B → C

doA()
  ↓
doC()
  ↓
doB()

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

## 4. Inversion of Control

When we pass a callback to another function, we give that function control over **when and how** our callback will be executed.

```js
someLibrary(data, function callback(result) {
  // continuation
});

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

analytics.trackPurchase(data, function () {
  chargeCreditCard();
});

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

## 9. The Sync vs Async Problem

One dangerous situation occurs when an API sometimes calls a callback synchronously and sometimes asynchronously.

```js
var a = 0;

someAPI(function () {
  console.log(a);
});

a++;

## 10. Zalgo

**Zalgo** describes the problematic situation where a function may invoke a callback either synchronously or asynchronously.

```text
Sometimes:
API → callback

Sometimes:
API → later → callback