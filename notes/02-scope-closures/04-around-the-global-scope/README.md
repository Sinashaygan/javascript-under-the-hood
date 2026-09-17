## Section: Why Global Scope?

### Core Concepts
- In the absence of modules, the **Global Scope** is the only way for separate files/scripts to interconnect and share variables.
- It's the "glue" that holds a program together, especially in simpler, multi-script browser environments.
- It also serves as the access point for features provided by the host environment (e.g., `console`, `setTimeout` in browsers, or `process` in Node).

### Key Insight
- Even with modern module systems (ESM, CommonJS), the concept of a "global" space for environment-provided utilities remains essential. The way we *interact* with it has changed, but its existence is a core part of the JS model.

### Source
- *scope-closures/ch4.md, lines 1-54.*

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
- *scope-closures/ch4.md, lines 55-141.*

## Section: Web Workers

### Core Concepts
- A Web Worker runs in a separate thread with its own completely separate and isolated global scope.
- It has **no access** to the main UI thread's `window` object or the DOM.
- The global object reference inside a worker is `self`, not `window`.

### Key Insight
- The same `var` vs. `let`/`const` behavior applies: `var` declarations in a worker's top-level scope will create properties on the `self` object, while `let`/`const` will not.

### Source
- *scope-closures/ch4.md, lines 142-160.*

## Section: ESM & DevTools Console

### Summary
- In an ES Module file (using `import`/`export`), top-level variable declarations are **not global**. They are "module-wide" and private to that module unless explicitly exported.
- The DevTools console can be misleading. It often emulates a "global scope" for ease of use, but its behavior doesn't perfectly match how code runs in a real script or module.

### Frontend Takeaway
- **ESM is the standard for encapsulation.** Variables you define at the top of a module file will not accidentally collide with globals or variables in other modules.
- Be cautious when testing scope behavior in the console. It's a useful tool, but not a 100% accurate simulation of file-based execution.

### Source
- *scope-closures/ch4.md, lines 161-196.*

## Section: The Node.js Env

### Core Concepts
- Similar to ESM, Node.js treats every file as a separate module (using the CommonJS format by default).
- Node wraps the code in each file inside a function. Therefore, top-level `var` or `let`/`const` declarations are local to that module's function scope, **not global**.
- To create a true global variable in Node, you must explicitly assign it as a property of the `global` object.

### Key Insight
- Identifiers like `require`, `module`, `exports`, `__dirname`, and `__filename` seem global but are actually parameters passed to the module-wrapping function.

### Source
- *scope-closures/ch4.md, lines 197-233.*

## Section: globalThis

### Summary
- The name of the global object has always been inconsistent across JavaScript environments:
    - **Browser (main thread):** `window`
    - **Web Worker:** `self`
    - **Node.js:** `global`
- **`globalThis`** (introduced in ES2020) provides a single, standardized way to access the global object, regardless of the current environment.

### Best Practice
- **Use `globalThis`** whenever you need to reliably access the global object in code that might run in different environments (isomorphic code). This avoids manual checks like `typeof window !== "undefined"`.

### Source
- *scope-closures/ch4.md, lines 234-290.*

## Section: Globally Aware

### Summary
- Understanding the "Global Scope" means understanding the rules of the specific JS environment your code is running in.
- The modern approach (ESM, Node.js) strongly favors encapsulating files into modules, minimizing the use of the shared global scope.
- True global scope is still necessary for environment-provided utilities and, in rare cases, for application-wide constants or systems.

### Architectural Takeaway
- **Is your code...**
    - A standalone script? -> It uses the classic browser `window` global scope.
    - An ES Module? -> Its top level is a private module scope.
    - A Node.js file? -> Its top level is a private module scope.
- When writing code that needs to work everywhere, use `globalThis` to interact with the global object.

### Source
- *scope-closures/ch4.md, lines 291-306.*
