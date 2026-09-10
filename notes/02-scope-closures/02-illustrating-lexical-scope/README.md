## Section: Marbles, Buckets, and Bubbles

### Summary
To reason about scope, we use metaphors:
- **Marbles:** Variables/Identifiers.
- **Buckets/Bubbles:** Scopes (functions, blocks).
- **Colors:** Each scope is assigned a color, and variables (marbles) take the color of the bucket they are declared in.

### Frontend Takeaway
Visualizing scope boundaries as colored bubbles helps prevent bugs where you incorrectly assume access to variables from outer or unrelated scopes.

### Source
get-started/ch2.md, lines 9–76.

## Section: Scope Resolution

### Summary
- Scopes are nested.
- A bubble's variables are available to that bubble and its nested children.
- Variable colors are determined during compilation, not runtime.
- Lookup: If a variable isn't in the current scope, the JS engine checks the outer parent scope.

### Common Mistakes
- Thinking variables are colored based on where they are accessed. They are colored based on where they are *declared*.
- Forgetting that object properties (e.g., `id`, `name`) are not "marbles" and don't follow these scoping rules.

### Source
get-started/ch2.md, lines 77–110.
