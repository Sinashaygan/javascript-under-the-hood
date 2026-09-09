# Chapter 2: Surveying JS

> Independent study notes for *You Don't Know JS Yet*, 2nd Edition, Get Started, Chapter 2.

**Source:** `get-started/ch2.md`  
**Status:** Completed

## Chapter Summary

JavaScript is a language composed of several connected systems: values and types,
variables, functions, comparisons, objects, classes, and module systems. This
chapter provides a high-level survey to build a foundational map of the language
before subsequent books explore each area in depth.

The main goal is to understand JavaScript's foundational nature and establish
accurate mental models for how its core mechanisms behave.

## Study Method

Use the active learning cycle:

**Read → Predict → Run → Explain**

1. **Read** each code snippet carefully.
2. **Predict** the evaluation and output before execution.
3. **Run** the example in a clean JavaScript environment.
4. **Explain** the underlying mechanism behind the result.
5. **Modify** parameters or references and predict the new output.

Focus areas during analysis:
- The precise type of each value.
- Whether variables share a reference or hold independent values.
- The lexical scope in which a binding exists.
- Where implicit type coercion takes place.
- Whether a function returns a value or produces side effects.

## 1. Each File Is a Program

Each JavaScript file is processed as an independent program. Build tools and
bundlers analyze dependency graphs between files and assemble them into
executable applications.
```text
Several source files
↓
Dependency analysis
↓
Build or bundling process
↓
Executable application
```

## 2. Values and Types

Programs manipulate values. Values can be assigned, passed, returned, stored,
and compared.

### Primitive Types
JavaScript primitives include:
- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `bigint`
- `symbol`

```
javascript
const name = "Sara";
const age = 25;
const active = true;
const emptyValue = null;
let result;
const largeNumber = 123n;
const identifier = Symbol("id");
```

### Objects and Arrays
Objects and arrays are reference types that hold collections of properties:

```
javascript
const user = {
  name: "Sara",
  age: 25,
};

const numbers = [1, 2, 3];
```

### The `typeof` Operator
`typeof` returns a string classifying the type of an operand:

```
javascript
typeof "hello";    // "string"
typeof 42;         // "number"
typeof true;       // "boolean"
typeof undefined;  // "undefined"

// Historical legacy behaviors:
typeof null;       // "object"
typeof [];         // "object"
```

## 3. Declaring and Using Variables

### Declarations and Scope
- `var`: Function-scoped, ignores standard block boundaries.
- `let`: Block-scoped, reassignable.
- `const`: Block-scoped, prevents reassignment (must be initialized).

```
text
var   → function scope
let   → block scope
const → block scope
```

### Reassignment vs. Mutation

- **Reassignment:** Modifying which value/reference a variable identifier points to.
- **Mutation:** Modifying the internal contents of an existing object or array.

```
javascript
const user = { name: "Sara" };
user.name = "Mina"; // VALID: Object mutation

user = { name: "Ali" }; // ERROR (TypeError): Variable reassignment

text
const prevents identifier reassignment.
const does not make underlying objects immutable.

```

## 4. Functions

Functions are reusable, callable units of behavior and first-class values.

### Parameters vs. Arguments
```text
Parameter → Name defined in function signature
Argument  → Concrete value passed during invocation

### Return Values vs. Side Effects
- `return` yields an explicit value back to the caller.
- `console.log` produces a side effect (standard output) and returns `undefined`.

### First-Class Functions
Functions can be treated like any other value: assigned to variables, passed
into other functions (callbacks), and returned.

javascript
function greet() {
  return "Hello";
}

const fn = greet; // Assigned reference, not invoked
console.log(fn()); // "Hello"
```

## 5. Comparisons

### Strict Equality (`===`) vs. Loose Equality (`==`)
- `===` (Strict): Checks both type and value without implicit coercion.
- `==` (Loose): Allows implicit type coercion before comparison.
```
javascript
42 === "42"; // false (different types)
42 == "42";  // true (string coerced to number)
0 == false;  // true
0 === false; // false
```

### `NaN` (Not a Number)
`NaN` is of type `number`, but is not equal to anything, including itself:

```
javascript
NaN === NaN;           // false
Object.is(NaN, NaN);   // true
```

### Object Reference Equality
Objects are compared by reference identity, not structural content:

```
javascript
{} === {}; // false (distinct instances)

const a = {};
const b = a;
a === b;   // true (shared memory reference)
```

### Relational Comparisons
Relational operators (`<`, `>`) compare numbers numerically and strings
lexicographically (character code order):

```
javascript
10 < 9;     // false (numeric)
"10" < "9"; // true (lexical: "1" comes before "9")
```

## 6. Code Organization Patterns

JavaScript provides multiple strategies to encapsulate state and logic.

## 6.1 Classes and Prototypes

Classes act as templates for instantiating objects with shared behavior.
```javascript
class Publication {
  print() {
console.log("Publication");
  }
}

class Book extends Publication {
  print() {
super.print(); // Calls parent method
console.log("Book");
  }
}

const book = new Book();
book.print();
// Publication
// Book

- **`this`**: Contextually references the active instance at call time.
- **`extends` & `super`**: Establishes inheritance delegation and enables method overriding.
```

## 6.2 Classic Modules (Factory Functions)

Classic modules use factory functions and closures to establish private state
and expose a selective public API.

```
javascript
function createCounter() {
  let count = 0; // Private state via closure

  function increment() {
count++;
  }

  function getCount() {
return count;
  }

  return {
increment,
getCount, // Public API
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 2
console.log(counter.count);      // undefined (hidden from outer scope)
```

### Classes vs. Classic Modules

```
| Feature | Class | Classic Module |
| :--- | :--- | :--- |
| **Primary Goal** | Object template / Shared prototype | Encapsulated state & scope |
| **Creation** | `new ClassName()` | Factory function call |
| **State Access** | Instance properties (`this`) | Lexical scope & closures |
| **Result** | Concrete instance | Public API object |
| **Core Mechanism**| `class`, `extends`, `this` | Closures, function scope |
```
## 7. ES Modules (ESM)

ES Modules represent the official ECMAScript standard for file-based
modularization using `import` and `export`.

### Named Exports
```javascript
// math.js
export const version = "1.0";
export function add(a, b) {
  return a + b;
}
```
```javascript
// app.js
import { version, add as sum } from "./math.js";
console.log(sum(2, 3)); // 5
```
### Default Exports
```javascript
// greet.js
export default function greet(name) {
  return `Hello, ${name}`;
}
```
```javascript
// app.js
import customGreet from "./greet.js";
```
### Encapsulation and File Boundaries
ES Modules provide clean architectural boundaries by:
- Scoping code strictly to individual files (avoiding global namespace pollution).
- Making dependencies and public contracts explicit.
- Supporting static analysis for tree-shaking and bundling optimizations.
