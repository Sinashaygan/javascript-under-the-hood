## Section: Why Global Scope?

### Core Concepts
- In the absence of modules, the **Global Scope** is the only way for separate files/scripts to interconnect and share variables.
- It's the "glue" that holds a program together, especially in simpler, multi-script browser environments.
- It also serves as the access point for features provided by the host environment (e.g., `console`, `setTimeout` in browsers, or `process` in Node).

### Key Insight
- Even with modern module systems (ESM, CommonJS), the concept of a "global" space for environment-provided utilities remains essential. The way we *interact* with it has changed, but its existence is a core part of the JS model.

### Source
- *get-started/ch4.md, lines 1-54.*
