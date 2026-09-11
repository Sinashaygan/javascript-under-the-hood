## Section: See the Closure & Adding Up Closures

### Core Concepts
- **Observational Definition of Closure:** Closure is observed when a function retains access to and uses variable(s) from outer scope(s) even when running in a different branch of the scope chain where those variables would normally not be accessible.
- **Function-Only Behavior:** Only functions exhibit closure; objects and classes do not have closure on their own.
- **Pointed Closures (Arrow Functions):** Even concise arrow functions create their own lexical scope and can form independent closures over enclosing variables (e.g., inside `.find(student => student.id == studentID)`).
- **Per-Instance Nature:** Closure is bound to runtime **instances** of a function, not just its static lexical definition. Each invocation of a factory function (like `adder(10)` and `adder(42)`) creates distinct scope environments and distinct closures.

### Key Insight
- Lexical scope is compiled at build time, but closure is a runtime characteristic tied to live function instances in memory.

### Source
- *scope-closures/ch7.md, lines 1-175.*

## Section: Live Link, Not a Snapshot

### Core Concepts
- **Live Reference:** Closure is not a snapshot or copy of a value at a point in time; it is a **live link** to the variable itself. If the variable is reassigned or mutated later, any closed-over function will observe the updated value on its next invocation.
- **The Classic Loop Hazard:** Defining functions inside a `for (var i = 0; ...)` loop closes over the single, shared `var i` variable across all iterations, causing all functions to read the final termination value (e.g., `3`).
- **Loop Fixes:**
  1. *Manual iteration copy:* Declaring `let j = i;` inside the loop body creates a separate variable for each iteration.
  2. *Idiomatic block scoping:* Using `for (let i = 0; ...)` automatically creates a new `i` binding per iteration under ES6 semantics.

### Key Insight
- Closures bind to *variables* (containers), not to the *values* held inside them.

### Source
- *scope-closures/ch7.md, lines 176-320.*

## Section: Common Closures & What If I Can't See It?

### Summary
- **Everyday Closures:** Asynchronous callbacks (Ajax responses, Timers, DOM Event Listeners) are the most pervasive real-world examples of closure, retaining access to parameter state long after the outer function has completed execution.
- **False Closures (Non-Observable):**
  1. *Same-scope invocation:* Calling a nested helper function within its own parent scope is ordinary lexical lookup, not closure.
  2. *Global variable access:* Global variables are ubiquitously accessible from everywhere; referencing them does not constitute closure.
  3. *Unreferenced variables:* Outer variables never referenced by the inner function are eligible for garbage collection.
  4. *Uninvoked functions:* Functions that are created but never executed or passed around never manifest closure behavior.

### Key Criteria
- For closure to be meaningful, the function must be invoked outside the original lexical scope branch where the closed-over identifier was created.

### Source
- *scope-closures/ch7.md, lines 321-435.*
