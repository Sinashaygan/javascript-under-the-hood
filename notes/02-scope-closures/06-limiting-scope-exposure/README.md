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
