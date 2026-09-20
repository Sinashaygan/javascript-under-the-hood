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