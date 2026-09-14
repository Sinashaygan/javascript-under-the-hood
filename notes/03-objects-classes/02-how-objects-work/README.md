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
