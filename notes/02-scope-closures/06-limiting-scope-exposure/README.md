## Section: Least Exposure

### Core Concepts
- **Principle of Least Exposure (POLE):** Derived from security's "Principle of Least Privilege" (POLP). Components and scopes should default to exposing the bare minimum required information, keeping everything else private.
- **Three Hazards of Scope Over-Exposure:**
  1. **Naming Collisions:** Shared identifiers in an outer scope risk unexpected overrides across different routines (e.g., sharing a loop counter `i`).
  2. **Unexpected Behavior:** Exposing private structures allows unauthorized external mutations that violate invariants.
  3. **Unintended Dependency:** Outer parts of an application grow dependent on private internals, introducing severe refactoring liabilities.

### Key Insight
- Defensive architecture dictates declaring variables in the smallest, most deeply nested scopes possible rather than placing them in outer or global scopes.

### Source
- *scope-closures/ch6.md, lines 1-85.*

## Section: Hiding in Plain (Function) Scope

### Summary
- State that needs to persist across invocations (like a cache/memoization table) can be encapsulated within an intermediate function scope to prevent global leakage.
- **Function Expression Encapsulation:** Using a named function expression avoids polluting the outer scope with auxiliary setup function names; the expression identifier remains scoped inside itself.
- **Immediately Invoked Function Expression (IIFE):** A function expression defined and executed immediately `(function(){ ... })()`. It is ideal for defining a private execution boundary on demand.

### Best Practice
- Name function expressions semantically even when used purely for scope isolation; this improves stack traces and internal recursion clarity.

### Source
- *scope-closures/ch6.md, lines 86-215.*

## Section: Function Boundaries

### Core Concepts
- Wrapping existing code blocks in an IIFE alters execution semantics because a true **function boundary** is introduced:
  - `return` statements now exit only the local IIFE, not the outer enclosing function.
  - `this` binding can be altered (unless using arrow functions).
  - Control-flow constructs like `break` and `continue` cannot cross the IIFE boundary to manipulate outer loops or switch blocks.
- Standalone IIFEs strictly require surrounding parentheses `(function(){ ... })()` to force the parser into expression mode rather than statement declaration mode.

### Frontend Takeaway
- If your code segment requires control jumps (`break`, `continue`, `return`) relative to outer logic, use block scoping (`let` with `{}`) rather than an IIFE.

### Source
- *scope-closures/ch6.md, lines 216-255.*
