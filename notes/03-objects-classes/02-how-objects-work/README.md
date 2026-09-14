## Section: Metaobject Protocol (MOP) and Property Descriptors

### Core Concepts
- **Metaobject Protocol (MOP):** The fundamental rules and internal mechanisms defining how objects and their properties behave during runtime interactions.
- **Property Descriptor Metaobject:** Each object property is internally configured by a descriptor containing distinct behavioral attributes:
  - `value`: The underlying data held by the property.
  - `writable`: Controls value mutability via assignment.
  - `enumerable`: Governs inclusion in enumerations and iterations.
  - `configurable`: Controls whether the descriptor attributes can be modified or deleted.
- **Inspection & Definition APIs:**
  - `Object.getOwnPropertyDescriptor(obj, prop)`: Inspects the descriptor of an owned property.
  - `Object.defineProperty(obj, prop, descriptor)`: Creates or updates a property with explicit attribute flags.
  - `Object.defineProperties(obj, descriptors)`: Bulk definition of multiple properties with individual descriptors.
- **Descriptor Stripping Hazard:** Duplication operations (such as object spread `{ ...obj }` and `Object.assign(..)`) perform simple `=` value access and assignment; **they do not replicate property descriptors**.

### Architectural Takeaway
Property descriptors allow fine-grained control over API contracts on objects. Never assume cloning techniques preserve descriptor constraints like non-writability or custom getters/setters.

### Source
*objects-classes/ch2.md, "Property Descriptors"*

## Section: Accessor Properties (Getters & Setters)

### Core Concepts
- **Accessor vs Data Descriptors:** Unlike data properties (which hold a fixed `value` and a `writable` boolean), accessor properties replace them with `get()` and/or `set(v)` methods.
- **Execution Under the Hood:**
  - Property access (`obj.prop`) transparently executes the underlying `get()` function.
  - Property assignment (`obj.prop = val`) transparently executes the underlying `set(val)` function.
- **Mutation Suppression:**
  - Defining a getter without a setter turns the property effectively read-only.
  - In non-strict mode, assigning to a getter-only property silently fails; in strict mode, it throws a `TypeError`.
  - Defining a custom setter allows intercepting, transforming, validating, or completely ignoring inbound values.

### Architectural Takeaway
Accessor properties expose functional execution behind standard property access syntax, enabling dynamic validation and calculated state without breaking consumption interfaces.

### Source
*objects-classes/ch2.md, "Accessor Properties"*

## Section: Descriptor Flags (Enumerable, Writable, Configurable)

### Core Concepts
- **`enumerable`:**
  - Dictates visibility during enumeration sweeps: `Object.keys(..)`, `Object.entries(..)`, `for..in` loops, and shallow copy operations (`...`, `Object.assign`).
  - Non-enumerable properties remain directly accessible via `obj.prop` and discoverable via `Object.getOwnPropertyNames(..)`.
- **`writable`:**
  - Dictates whether value assignment via `=` is permitted.
  - Setting `writable: false` creates a read-only property. However, if `configurable: true` persists, the value can still be mutated by redefining the descriptor with `Object.defineProperty(..)`.
- **`configurable` (The One-Way Gate):**
  - Dictates whether a property's descriptor can be re-defined, switched between data/accessor types, or deleted via `delete`.
  - Once set to `configurable: false`, it cannot be reversed back to `true`.
  - *Exception:* If `configurable: false`, the runtime allows transitioning `writable` from `true` to `false`, but never from `false` to `true`.

### Architectural Takeaway
True immutability on an individual property requires locking both `writable: false` and `configurable: false` simultaneously.

### Source
*objects-classes/ch2.md, "Enumerable, Writable, Configurable"*

    ## Section: Object Sub-Types: Arrays and Empty Slots

### Core Concepts
- **Specialized Numerical Indexing:** Arrays are derived object sub-types explicitly optimized for 0-based integer indexing.
- **Index Coercion:** String keys that evaluate as valid integer numbers (e.g., `"2"`) are coerced and treated as integer indexes (`2`). Adding arbitrary string-named properties to arrays is an anti-pattern.
- **The `length` Mechanism:**
  - The `length` property automatically tracks the maximum assigned index plus one.
  - *Performance Myth:* `length` is **not** an expensive accessor getter. Caching `arr.length` prior to non-mutating iteration is an obsolete 10-year-old anti-pattern; modern JS engines optimize property lookups internally.
- **Empty Slots (Sparse Arrays):**
  - Assigning beyond the array boundary (e.g., `arr[14] = "x"` on an array of length 3) creates empty slots rather than explicit `undefined` values.
  - Built-in higher-order methods (such as `map(..)`, `filter(..)`, and `forEach(..)`) **silently skip** empty slots, creating unexpected edge cases and bugs.

### Architectural Takeaway
Never intentionally create sparse arrays with empty slots. Treat array indices strictly as dense numerical sequences.

### Source
*objects-classes/ch2.md, "Object Sub-Types: Arrays" & "Empty Slots"*

## Section: Object Sub-Types: Functions

### Core Concepts
- **First-Class Callable Objects:** Functions are specialized object sub-types capable of being invoked while concurrently exposing owned properties.
- **Built-in Reflection Properties:**
  - `fn.name`: Holds the lexical identifier or inferred name of the function.
  - `fn.length` (Arity): Indicates the count of formal declared parameters.
- **Arity Calculation Boundaries:**
  - Parameters with default initializers (`param = 42`) and rest parameters (`...rest`) are **excluded** from `fn.length`.
  - `length` counts only explicit, non-default parameters appearing prior to the first default or rest parameter.
- **Property Mutation Anti-Pattern:** Storing arbitrary application state directly on function objects pollutes function definitions. Use decoupled `Map` or `WeakMap` collections with the function instance as the key.

### Architectural Takeaway
Keep function objects pure and executable. Extract dynamic state association into `WeakMap` structures rather than attaching arbitrary properties directly to function instances.

### Source
*objects-classes/ch2.md, "Object Sub-Types: Functions"*
