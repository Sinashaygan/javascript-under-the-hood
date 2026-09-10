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
