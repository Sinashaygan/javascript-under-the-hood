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

## Section: Property Naming, String Coercion, and Symbols

### Core Concepts
- **Property Name Stringification:** Most property names are coerced to string values. Exceptions:
  - Integer / integer-like keys are treated as numeric indices.
  - Symbols remain primitive symbols without coercion.
- **Object Coercion Hazard:** Passing an object as a property key coerced it to `"[object Object]"`. When distinct object keys are needed, developers must use `Map` rather than regular objects.
- **Computed Property Names (`[expr]`):** Introduced in ES6, allows dynamic evaluation of property keys at literal definition time.
- **Symbols as Unique Keys:**
  - Instantiated via `Symbol("desc")` without `new`.
  - Provide globally unique, collision-free property identifiers.
  - Opaque to the runtime; descriptions are strictly used for developer debugging.

### Architectural Takeaway
Avoid relying on implicit object-to-string coercion for keys; migrate key-value mappings requiring object references to `Map` collections, and leverage `Symbol` to prevent property name collisions across decoupled modules.

### Source
*objects-classes/ch1.md, "Property Names" & "Symbols As Property Names"*

    ## Section: Concise Syntax Patterns

### Core Concepts
- **Concise Properties:** When an in-scope identifier matches the intended property name, `{ prop }` provides shorthand for `{ prop: prop }`.
- **Concise Method Definitions:** Syntactic sugar `method() { .. }` replaces `method: function() { .. }`.
- **Concise Generators:** Expressed directly using `*generatorMethod() { yield .. }`.
- **Dynamic Concise Definitions:** Concise methods and generators support quoted identifiers (`"prop-name"() { .. }`) and computed names (`[expr]() { .. }`).

### Architectural Takeaway
Concise syntax drastically reduces lexical boilerplate in declarative code without altering underlying property assignment semantics.

### Source
*objects-classes/ch1.md, "Concise Properties" & "Concise Methods"*

## Section: Object Duplication Mechanics

### Core Concepts
- **Object Spread (`...`):**
  - Executes a shallow copy of owned, enumerable properties from source to target.
  - Overwrites previous properties in lexical order (top-to-bottom).
  - Retains shared references to nested objects/functions.
- **Deep Copy Limitations & Strategies:**
  - `JSON.parse(JSON.stringify(..))`: Primitive round-trip workaround; destroys non-JSON serializable values (functions, undefined, BigInt) and breaks on circular references.
  - `structuredClone(..)`: Modern platform standard; cleanly handles circular references, Set, Map, Date, and TypedArrays.
  - **Unclonable Targets:** Functions and DOM elements cannot be duplicated via `structuredClone` (throws `DataCloneError`).

### Architectural Takeaway
Use object spread `{ ...obj }` strictly for flat data models. Prefer platform-level `structuredClone(..)` for state duplication with complex data types or recursive structures, recognizing that behavioral members (methods/functions) must remain reference-shared.

### Source
*objects-classes/ch1.md, "Object Spread" & "Deep Object Copy"*

## Section: Property Access, Reflection, and Destructuring

### Core Concepts
- **Access Modalities:**
  - Dot notation (`obj.prop`) for valid identifier tokens.
  - Bracket notation (`obj[expr]`) for numeric keys, special characters, or evaluated expressions.
- **Reflection APIs:**
  - `Object.entries(obj)`: Extracts `[ [key, value], ... ]` tuples for owned enumerable properties.
  - `Object.fromEntries(entries)`: Symmetric utility transforming entry lists back into objects.
- **Declarative Destructuring:**
  - Pattern matching extraction: `{ favoriteNumber = 12 } = obj`.
  - Target aliasing / renaming: `{ isDeveloper: isDev } = obj`.
  - Target assignment without declaration: `({ prop: target } = obj)` (requires wrapping parentheses to prevent block-statement parsing ambiguity).

### Architectural Takeaway
Destructuring provides a declarative contract for extracting multiple properties into local scopes. Objects function cleanly as temporary multi-value transport mechanisms across function boundaries.

### Source
*objects-classes/ch1.md, "Accessing Properties", "Object Entries", & "Destructuring"*
