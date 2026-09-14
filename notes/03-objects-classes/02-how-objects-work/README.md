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
