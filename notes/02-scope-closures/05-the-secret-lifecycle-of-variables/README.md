## Section: When Can I Use a Variable?

### Core Concepts
- Identifiers are registered to their scopes during compile time and created at the start of each scope entry.
- **Function Hoisting:** Formal `function` declarations are both hoisted and auto-initialized to their function reference at the start of their enclosing scope, allowing them to be invoked anywhere in that scope.
- **Variable Hoisting (`var`):** Identifiers declared with `var` are hoisted and auto-initialized to `undefined`.
- **Declaration vs. Expression:** Function expressions assigned to `var` (e.g., `var fn = function(){}`) only hoist the identifier with `undefined`; invoking them before assignment throws a `TypeError`, not a `ReferenceError`.

### Key Insight
- `function` and `var` declarations attach to the nearest enclosing **function scope** (or global), bypassing enclosing block scopes.

### Source
- *get-started/ch5.md, lines 1-100.*
