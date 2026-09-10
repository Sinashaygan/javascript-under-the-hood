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

## Section: The JS Engine Conversations

### Core Concepts
- **Engine:** Executes code.
- **Compiler:** Lexes/parses code, asks Scope Manager about declarations.
- **Scope Manager:** Maintains the lookup list of declared variables.

### Frontend Takeaway
Thinking like the "Engine" helps you understand why some variables are available (hoisted) and others result in `ReferenceError`.

### Source
get-started/ch2.md, lines 112–153.

## Section: Processing Statements (var students = [...])

### Summary
JS processes declarations in two steps:
1. **Compiler:** Checks if the variable exists in the current scope; if not, creates it.
2. **Engine:** Executes the assignment at runtime.

### Source
get-started/ch2.md, lines 154–209.

## Section: Nested Scope & Failures

### Core Concepts
- If a variable isn't found in the current scope, look up the chain until the global scope.
- **ReferenceError:** Thrown when a *source* reference (or strict-mode *target*) cannot be found anywhere in the scope chain.

### Common Mistakes
- Confusing "Not Defined" (Undeclared) with "Undefined" (Declared but no value).
- `typeof` returning "undefined" for both cases, masking the underlying error.

### Source
get-started/ch2.md, lines 210–267.
