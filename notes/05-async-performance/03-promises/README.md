# You Don't Know JS Yet: Async & Performance

## Chapter 3: Promises

## 1. What Is a Promise?

A **Promise** represents a value that may not be available yet but will be available in the future.

Instead of passing a callback to another function and giving it control over the continuation, a Promise lets a function return a value representing the future result.

```js
const promise = fetch("/users");
```

The Promise represents the future result of the `fetch()` operation.

A Promise can eventually become:

* **fulfilled** with a value
* **rejected** with a reason

```text
Promise
   |
   +-- fulfilled → value
   |
   +-- rejected  → reason
```

---


## 2. Future Values

Synchronous JavaScript normally works with values that are available immediately.

Asynchronous operations deal with values that will become available later.

A Promise provides a way to work with these **future values** without manually managing when the value becomes available.

```js
const p = fetchData();

p.then(data => {
    console.log(data);
});
```

The Promise acts as a placeholder for the future result.

---

## 3. Promise States

A Promise starts in the **pending** state.

It can then transition to one of two final states:

```text
pending
   |
   +-- fulfilled
   |
   +-- rejected
```

Once a Promise has been fulfilled or rejected, its state cannot change again.

```js
const p = new Promise((resolve, reject) => {
    resolve(42);

    reject("Oops"); // ignored
});
```

Only the first resolution matters.

---

## 4. Fulfillment and Rejection

A Promise can represent both success and failure.

```js
const p = new Promise((resolve, reject) => {
    if (success) {
        resolve("Success!");
    } else {
        reject("Something went wrong");
    }
});
```

Fulfillment provides a value:

```js
p.then(value => {
    console.log(value);
});
```

Rejection provides a reason:

```js
p.catch(error => {
    console.error(error);
});
```

---

    