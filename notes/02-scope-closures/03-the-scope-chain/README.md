## Section: The Scope Chain & Conceptual Lookup

### Summary
- **Scope Chain:** The directed path of nested scopes, moving outward/upward.
- **Lookup Process:** Conceptually, the engine searches from the current scope outward until it finds the identifier.
- **Optimization:** Lexical scope colors (which bucket a variable belongs to) are mostly resolved during **compilation**, not runtime. This eliminates unnecessary runtime lookups.

### Source
scope-closures/ch3.md, lines 1–65.
