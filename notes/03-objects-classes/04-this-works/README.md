## Section: This-Aware Functions and Dynamic Context

### Core Concepts

* **`this`-Aware Functions:** A function is `this`-aware when its body contains a `this` reference.

* **Runtime Binding:** The value of `this` is determined when the function is invoked, not when the function is defined.

* **Implicit Parameter:** `this` can be thought of as an implicit parameter supplied to a function invocation.

* **Dynamic Context:** Unlike lexical scope, which is static, `this` provides a form of dynamically assigned execution context.

* **Call-Site First:** To understand what `this` refers to, inspect how the function is called rather than where it was declared.

### Architectural Takeaway

Treat `this` as a dynamically assigned context rather than a reference to the function or the object where the function was originally defined. `this`-aware code should be used intentionally because its behavior requires readers to understand the invocation context.

### Source

*objects-classes/ch4.md, "This Aware" & "So What Is This?"*

## Section: Implicit and Default Context

### Core Concepts

* **Implicit Context:** Calling a function through an object reference, such as `obj.method()`, implicitly assigns `obj` as the function's `this`.

* **Method Extraction:** Extracting a method into a standalone variable removes the object reference from the call-site.

```js
const init = point.init;

init(3, 4);
```

* **Default Context:** When no other `this`-assignment rule applies, the function receives the default context.

* **Strict Mode:** In strict mode, a standalone regular function invocation receives `undefined` as `this`.

* **Non-Strict Mode:** In non-strict mode, the default context is `globalThis`.

### Architectural Takeaway

Never assume that a function originally defined as an object method will retain that object's context when passed around. Always inspect the actual call-site.

### Source

*objects-classes/ch4.md, "Implicit Context Invocation" & "Default Context Invocation"*

## Section: Explicit Context and New Context Invocation

### Core Concepts

* **Explicit Context:** `call()` and `apply()` allow the caller to explicitly provide the `this` value.

```js
fn.call(obj, arg1, arg2);

fn.apply(obj, [arg1, arg2]);
```

* **`call()`:** Invokes the function immediately and accepts arguments individually.

* **`apply()`:** Invokes the function immediately and receives the function arguments as an array-like collection.

* **Function Borrowing:** A method can be reused with another object by explicitly assigning that object as `this`.

```js
point.init.call(anotherPoint, 5, 6);
```

* **`new` Binding:** Invoking a function with `new` creates a new object and uses that object as the function's `this`.

```js
const point = new Point(3, 4);
```

### Architectural Takeaway

Use explicit binding when an existing function needs to operate against a different object context. `call()` and `apply()` immediately invoke the function, while `new` creates a new object context for construction.

### Source

*objects-classes/ch4.md, "Explicit Context Invocation" & "New Context Invocation"*
