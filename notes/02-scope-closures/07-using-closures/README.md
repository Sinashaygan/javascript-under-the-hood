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
