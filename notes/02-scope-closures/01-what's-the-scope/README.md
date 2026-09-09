# Chapter 4: The Bigger Picture

> Independent study notes for *You Don't Know JS Yet*, 2nd Edition, Get Started, Chapter 4.

## Chapter Summary
This chapter organizes deeper JavaScript learning around three pillars:
scope and closure, prototypes, and types and coercion. It outlines a learning
approach: investigate popular assumptions, master JS mechanisms, and adopt
incremental changes in team environments.

## Core Concepts
- Lexical scope determines variable reference resolution.
- Closures retain access to surrounding lexical scopes.
- Objects can be created without class definitions.
- Prototype links enable behavior delegation (lookup chain).
- Types and coercion are critical for runtime behavior.
- Static type tools (TypeScript) supplement, not replace, JS knowledge.

## Methodology: "Working with the Grain"
1. **Investigate:** Don't accept myths (like "hoisting means dynamic scope").
2. **Verify:** Use the language specification to resolve disagreements.
3. **Increment:** Introduce better practices via small, understandable changes.

## Section: Scope and Closure

### Summary
JavaScript uses lexical scope. Functions retain access to surrounding
variables through closure, supporting patterns like modules.

### Frontend Takeaway
When debugging callbacks, event handlers, or React renders, identify the
environment in which the function was created to determine accessible variables.

### Common Mistakes
- Confusing lexical lookup with `this` binding.
- Thinking closure preserves a snapshot of a value (rather than a variable reference).
- Treating hoisting as evidence that JS is not lexically scoped.

### Source
get-started/ch4.md, lines 12–32.
