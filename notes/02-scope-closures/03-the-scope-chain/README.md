## Section: The Scope Chain & Conceptual Lookup

### Summary
- **Scope Chain:** The directed path of nested scopes, moving outward/upward.
- **Lookup Process:** Conceptually, the engine searches from the current scope outward until it finds the identifier.
- **Optimization:** Lexical scope colors (which bucket a variable belongs to) are mostly resolved during **compilation**, not runtime. This eliminates unnecessary runtime lookups.

### Source
scope-closures/ch3.md, lines 1–65.

## Section: Shadowing

### Core Concept
Shadowing occurs when a variable in an inner scope has the same name as one in an outer scope. 
- The inner scope "shadows" the outer one, making the outer variable unreachable from that point inward.
- The lookup stops at the first match it finds in the current or inner-most scope.

### Frontend Takeaway
Be aware that shadowing is intentional but can obscure variables. It is lexically impossible to reach a shadowed variable via its identifier name.

### Source
scope-closures/ch3.md, lines 67–134.

## Section: Global Unshadowing Trick

### Summary
While you generally cannot access a shadowed variable, global variables declared with `var` or `function` are properties of the **global object** (`window` in browsers).
- You can access these via `window.varName`.

### Warning
- **Avoid this practice.** It is confusing and prone to bugs.
- Only works for global variables; does not work for shadowed variables in nested function scopes.
- `let`, `const`, and `class` declarations in global scope do **not** become properties on the global object.

### Source
scope-closures/ch3.md, lines 135–224.

## Section: Illegal Shadowing

### Rules
- `let` can shadow `var`.
- `var` **cannot** shadow `let` if they are in the same scope boundary.
- If there is a function boundary between them, the `var` is allowed.

### Error
Attempting an illegal shadow throws a `SyntaxError` because the `var` is trying to cross a `let` scope boundary.

### Source
scope-closures/ch3.md, lines 249–300.

## Section: Function Name Scope

### Core Concepts
- **Function Declarations:** The name ends up in the enclosing scope.
- **Named Function Expressions:** The name identifier is scope-bound **inside** the function itself, not outside.
- **Immutability:** The name identifier of a named function expression is read-only inside its own scope.

### Source
scope-closures/ch3.md, lines 301–347.
