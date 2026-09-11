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

## Section: Hoisting: Yet Another Metaphor

### Summary
- The common metaphor of hoisting describes the JS engine physically "moving" or "lifting" declarations to the top of the file before running.
- In reality, JS does not rewrite or re-order source code at runtime.
- Hoisting is actually a **compile-time operation**: during the parsing/compilation phase, the engine finds all declarations and sets up instructions to register variables at scope boundaries before execution begins.

### Key Insight
- Thinking of JS as a single-pass interpreter leads to incorrect mental models. Recognizing the distinct **two-phase model (compile/parse, then execute)** clarifies how identifiers are known before execution reaches their lines.

### Source
- *get-started/ch5.md, lines 101-165.*

## Section: Re-declaration?

### Core Concepts
- Repeating `var studentName;` with the same identifier in the same scope is a compile-time **no-op** (does nothing and does not reset the value).
- Re-declaring an identifier in the same scope where either declaration uses `let` or `const` triggers an immediate compile-time `SyntaxError` (e.g., "identifier has already been declared").
- `var studentName;` is fundamentally different from `var studentName = undefined;`. The former is a no-op if already registered; the latter performs an explicit runtime reassignment.

### Frontend Takeaway
- Disallowing `let`/`const` re-declaration prevents accidental variable shadowing collisions and sloppy state resetting within the same scope.

### Source
- *get-started/ch5.md, lines 166-260.*

## Section: Constants

### Summary
- `const` requires an immediate initialization assignment at declaration; omitting it throws a `SyntaxError`.
- `const` declarations cannot be re-assigned. Attempting to re-assign a `const` throws a runtime `TypeError`.
- Because `const` forbids re-assignment and requires initialization, re-declaring a `const` would inherently imply a re-assignment, making `const` re-declaration technically impossible.

### Key Insight
- `SyntaxError` prevents the script from starting execution at all.
- `TypeError` occurs at runtime when an invalid operation (like mutating an immutable binding) is attempted during execution.

### Source
- *get-started/ch5.md, lines 261-295.*

## Section: Loops

### Core Concepts
- Scope rules apply **per scope instance**. Each iteration of a loop enters a new scope instance, resetting per-iteration declarations.
- A `let` inside a `while` or `for` loop body is declared once per iteration, not re-declared.
- In `for (let i = 0; i < 3; i++)`, the variable `i` belongs to the per-iteration loop scope, receiving the incremented value each turn.
- `const` is valid in `for..in` and `for..of` loops (and `while` bodies) because each iteration creates a brand new binding.
- `const` **fails** in standard counting `for (const i = 0; i < 3; i++)` because `i++` requires re-assignment of the same binding across updates.

### Frontend Takeaway
- Use `let` for counting `for` loops.
- Use `const` in `for..of` / `for..in` when the value is read-only within each iteration.

### Source
- *get-started/ch5.md, lines 296-390.*

## Section: Uninitialized Variables (aka, TDZ)

### Summary
- Unlike `var` (which auto-initializes to `undefined`), `let` and `const` remain **uninitialized** from scope entry until their declaration statement is executed.
- **Temporal Dead Zone (TDZ):** The time window between entering a scope and the actual execution of the variable's declaration/initialization.
- Accessing or assigning to a variable while in its TDZ throws a `ReferenceError` ("Cannot access identifier before initialization").
- TDZ is **temporal** (time-based), not spatial: calling a function before the declaration line will still throw if the function runs before the declaration executes.

### Proof of Hoisting
- Shadowing proves `let`/`const` hoist: if an inner block has `let x` and you read `x` before its line, it throws a TDZ error instead of reading the outer `x`. This proves the inner `x` was registered at block entry.

### Best Practice
- Always place `let` and `const` declarations at the top of their enclosing scope to reduce the TDZ window to near zero.

### Source
- *get-started/ch5.md, lines 391-490.*
