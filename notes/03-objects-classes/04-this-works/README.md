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
