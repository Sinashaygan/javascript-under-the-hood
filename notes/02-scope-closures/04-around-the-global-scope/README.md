## Section: Why Global Scope?

### Core Concepts
- In the absence of modules, the **Global Scope** is the only way for separate files/scripts to interconnect and share variables.
- It's the "glue" that holds a program together, especially in simpler, multi-script browser environments.
- It also serves as the access point for features provided by the host environment (e.g., `console`, `setTimeout` in browsers, or `process` in Node).

### Key Insight
- Even with modern module systems (ESM, CommonJS), the concept of a "global" space for environment-provided utilities remains essential. The way we *interact* with it has changed, but its existence is a core part of the JS model.

### Source
- *get-started/ch4.md, lines 1-54.*

## Section: The Browser Env

### Summary
- In browsers, the global scope and the `window` object are linked.
- Declarations with `var` and `function` create properties on the `window` object (mirroring).
- Declarations with `let`, `const`, and `class` create global variables, but they do **not** become properties of `window`. This is known as **Divergence**.
- Browser history also created "DOM Globals": elements with `id` attributes automatically become global variables. This is a bad practice to rely on.

### Frontend Takeaway
- **Avoid `var` in the global scope.** Use `let` or `const` to prevent polluting the `window` object and avoid conflicts with its built-in properties (like `window.name` or `window.top`).
- Never rely on DOM Globals. Always get element references with `document.querySelector` or similar methods.

### Source
- *get-started/ch4.md, lines 55-141.*

## Section: Web Workers

### Core Concepts
- A Web Worker runs in a separate thread with its own completely separate and isolated global scope.
- It has **no access** to the main UI thread's `window` object or the DOM.
- The global object reference inside a worker is `self`, not `window`.

### Key Insight
- The same `var` vs. `let`/`const` behavior applies: `var` declarations in a worker's top-level scope will create properties on the `self` object, while `let`/`const` will not.

### Source
- *get-started/ch4.md, lines 142-160.*
