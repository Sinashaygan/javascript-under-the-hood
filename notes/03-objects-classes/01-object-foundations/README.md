## Section: Object Foundations, Myths, and Literal Syntax

### Core Concepts
- **The "Everything is an Object" Myth:** Contrary to popular belief, not all values in JavaScript are objects (primitives like numbers, strings, and booleans are distinct types).
- **Objects as Containers:** An object is fundamentally a collection of key/value pairs acting as a versatile data container.
- **Syntactic Disambiguation of `{ .. }`:** Curly braces are heavily overloaded in JS:
  - Object literals (where value/expression is expected).
  - Destructuring patterns (on assignment left-hand sides or parameter lists).
  - Interpolated string expressions (inside template literals).
  - Block scopes (`if`, `for`, etc.) and function bodies.
- **Object Literal vs `new Object()`:** Object literal `{}` is the idiomatic, performant, and standard approach; `new Object()` is discouraged.
- **JavaScript vs JSON:**
  - JSON strictly requires double-quoted property names and purely literal values (no arbitrary JS runtime expressions, functions, comments, or trailing commas).
  - JS Object Literals allow unquoted identifiers, dynamic expressions, trailing commas, and inline comments.

### Architectural Takeaway
Objects form the foundation of JavaScript's second pillar (the prototype and `class` system). They should be declared declaratively using object literal syntax rather than constructor wrappers.

### Source
*objects-classes/ch1.md, "Objects As Containers" & "Looks Like JSON?"*
