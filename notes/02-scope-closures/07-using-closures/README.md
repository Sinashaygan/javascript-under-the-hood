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

## Section: The Closure Lifecycle and Garbage Collection (GC)

### Core Concepts
- A closed-over variable remains preserved in memory for as long as at least **one** referencing function instance remains alive and reachable.
- Once all function instances referencing that variable are discarded, the closure disappears and the variable becomes eligible for Garbage Collection (GC).
- **Memory Leak Pitfall:** Unmanaged long-lived callbacks (e.g., neglected DOM event listeners) keep their closed-over scopes alive indefinitely.

### Best Practice
- Explicitly unsubscribe event handlers and clear references (`clickHandlers = []`) when UI elements or operations are decommissioned to release underlying memory.

### Source
- *scope-closures/ch7.md, lines 436-515.*

## Section: Per Variable or Per Scope?

### Summary
- **Conceptual vs. Implementation:** Conceptually, closure is *per variable*. However, in engine implementations, closure is created *per scope* and then optionally optimized/trimmed down by modern engines to exclude unreferenced variables.
- **Optimization Hazards:** Cheats like `eval(..)` prevent the JavaScript engine from applying closure trimming optimizations, forcing the entire scope chain to stay retained in memory.
- **Manual De-referencing Pattern:** In performance-critical paths involving massive datasets (e.g., large arrays), setting large unused variables to `null` (`studentRecords = null`) ensures memory can be reclaimed even if the scope container persists.

### Architectural Takeaway
- Do not blindly rely on optional engine optimizations for large in-memory objects; manually disconnect large references when their initial use is done.

### Source
- *scope-closures/ch7.md, lines 516-640.*

## Section: An Alternative Perspective

### Core Concepts
- **Academic Model (Figure 4):** Functions are "first-class values" moving across scopes, dragging a hidden link back to their original lexical environment.
- **Implementational Model (Figure 5):**
  - Function instances **stay in place** inside their originating scope environments.
  - What actually gets passed around and returned to outer scopes is merely a **reference** to that in-place function.
  - When the reference is invoked from an outer scope, execution occurs naturally within the intact, in-place scope chain.
- In this model, closure is not "magic scope transportation," but the mechanism of **keeping a function instance and its scope chain alive** as long as any reference to it exists.

### Source
- *scope-closures/ch7.md, lines 641-725.*
