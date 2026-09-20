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

- **fulfilled** with a value
- **rejected** with a reason

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

p.then((data) => {
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
p.then((value) => {
  console.log(value);
});
```

Rejection provides a reason:

```js
p.catch((error) => {
  console.error(error);
});
```

---

## 5. Promises and Inversion of Control

Callbacks can create **Inversion of Control**:

```js
foo(function (result) {
    // continuation
});
```

The `foo()` function controls when and how the callback is invoked.

With Promises:

```js
foo()
    .then(result => {
        // continuation
    });
```

The function returns a Promise, and the caller controls how the continuation is attached.

```text
Callback:
You give control → foo()

Promise:
foo() → returns Promise → you control continuation
```

Promises therefore provide more predictable composition and control.

---

## 6. `.then()`

The `.then()` method registers handlers for a Promise.

```js
promise.then(
    value => {
        console.log(value);
    },
    error => {
        console.error(error);
    }
);
```

The first callback handles fulfillment.

The second callback handles rejection.

Most importantly, `.then()` returns a **new Promise**.

```js
const p2 = p1.then(value => {
    return value * 2;
});
```

This is what makes Promise chaining possible.

---

## 7. Promise Chaining

Promises can be chained to represent sequential asynchronous operations.

```js
fetchUser()
    .then(user => {
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log(posts);
    });
```

The result returned from one `.then()` becomes the fulfillment value of the next Promise.

```text
Promise
   ↓
then()
   ↓
new Promise
   ↓
then()
   ↓
new Promise
```

This creates a readable asynchronous flow.

---

## 8. Returning Promises from `.then()`

A critical rule is:

> If a `.then()` handler returns a Promise, the next Promise waits for it.

```js
fetchUser()
    .then(user => {
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log(posts);
    });
```

The `return` is important.

Without it:

```js
fetchUser()
    .then(user => {
        fetchPosts(user.id);
    })
    .then(posts => {
        console.log(posts);
    });
```

The second `.then()` does not wait for `fetchPosts()`.

---

## 9. Error Handling

Promises provide structured error propagation.

```js
doSomething()
    .then(result => {
        return doNext(result);
    })
    .catch(error => {
        console.error(error);
    });
```

If an error is thrown inside a `.then()` handler:

```js
Promise.resolve(42)
    .then(value => {
        throw new Error("Boom!");
    })
    .catch(error => {
        console.error(error);
    });
```

The returned Promise becomes rejected, allowing `.catch()` to handle the error.

---

## 10. `.catch()`

`.catch()` is used to handle Promise rejections.

```js
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.error(error);
    });
```

Conceptually, `.catch()` is equivalent to:

```js
promise.then(null, error => {
    console.error(error);
});
```

Using `.catch()` at the end of a chain is a common way to handle errors from previous asynchronous steps.

---

## 11. Promise.resolve()

`Promise.resolve()` creates or normalizes a Promise.

```js
const p = Promise.resolve(42);
```

This produces an already-fulfilled Promise.

It can also normalize a Promise or thenable:

```js
Promise.resolve(someValue)
    .then(value => {
        console.log(value);
    });
```

This is useful when working with values that may or may not already be Promises.

---

## 12. Promise.reject()

`Promise.reject()` creates an already-rejected Promise.

```js
const p = Promise.reject("Something went wrong");

p.catch(error => {
    console.error(error);
});
```

It is useful when an API needs to return a rejected Promise immediately.

---

## 13. Thenables

A **thenable** is an object that has a `then()` method.

```js
const thenable = {
    then(resolve) {
        resolve(42);
    }
};
```

Promise APIs can recognize thenables and adopt their eventual state.

This is based on **duck typing**:

> If an object behaves like a Promise, it can be treated as Promise-like.

`Promise.resolve()` is commonly used to normalize thenables.

---

## 14. Promise.all()

`Promise.all()` waits for multiple Promises to fulfill.

```js
Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
])
.then(([users, posts, comments]) => {
    console.log(users);
    console.log(posts);
    console.log(comments);
});
```

All Promises must fulfill.

If any Promise rejects, the resulting Promise rejects.

```text
P1 ───┐
P2 ───┼──→ Promise.all() → result
P3 ───┘
```

The results are returned in the same order as the input Promises, not in the order they finish.

---

## 15. Promise.race()

`Promise.race()` settles when the first Promise settles.

```js
Promise.race([
    fetchData(),
    timeout()
])
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error(error);
});
```

The first Promise to either fulfill or reject determines the result.

```text
P1 ────────┐
           ├──→ Promise.race() → first settled result
P2 ────┐   │
       └───┘
```

`Promise.race()` does **not** cancel the losing Promises.

---

## 16. Promise.all() vs Promise.race()

### Promise.all()

Use when you need **all operations** to complete.

```js
Promise.all([p1, p2, p3]);
```

Concept:

```text
Wait for ALL
```

### Promise.race()

Use when you care about the **first operation to settle**.

```js
Promise.race([p1, p2, p3]);
```

Concept:

```text
First settled wins
```

---

## 17. Multiple Observers

A single Promise can have multiple observers.

```js
const p = fetchData();

p.then(result => {
    console.log("Observer 1:", result);
});

p.then(result => {
    console.log("Observer 2:", result);
});
```

Both observers can receive the same eventual result.

This is different from chaining:

```js
p.then(first)
 .then(second);
```

Here, `second` observes the Promise produced by `first`.

---

## 18. Promises and Asynchrony

Promise callbacks are not invoked synchronously, even when the Promise is already fulfilled.

```js
const p = Promise.resolve(42);

p.then(value => {
    console.log(value);
});

console.log("After");
```

Output:

```text
After
42
```

This provides predictable asynchronous behavior and prevents callbacks from unexpectedly executing too early.

---

## 19. Promisifying Callback APIs

Older APIs often use callbacks:

```js
someAsyncOperation((error, data) => {
    if (error) {
        // handle error
    } else {
        // use data
    }
});
```

Such APIs can be wrapped with Promises:

```js
function request(url) {
    return new Promise((resolve, reject) => {
        ajax(url, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
```

Now the API can be used with Promise chains:

```js
request("/users")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
```

This process is commonly called **promisifying**.

---

## 20. Promises Are Not Event Streams

A Promise represents a single future resolution.

```text
Promise:
future value → one resolution
```

It is not designed for repeated events:

```text
click → click → click → click
```

For multiple future values or event streams, other abstractions such as Observables or Streams may be more appropriate.

---
