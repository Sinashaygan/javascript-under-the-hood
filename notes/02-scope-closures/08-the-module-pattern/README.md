## Section: Encapsulation and Least Exposure (POLE)

### Core Concepts
- **Encapsulation:** The co-location and bundling of related data (state) and functionality (behavior) serving a shared purpose.
- **Component Architecture Alignment:** Modern frontend paradigms (e.g., React/Vue components) represent an extension of encapsulation—packaging logic, markup, and styles into cohesive units.
- **Visibility Control (POLE):** The Principle of Least Exposure dictates that variables and internal routines must be *private by default*. Only minimal, strictly necessary surface areas should be exposed as the *public API*.
- **Lexical Scope as Guard:** JavaScript uses lexical scope boundaries rather than dedicated language visibility keywords (`private`/`public`) to enforce access boundaries.

### Architectural Takeaway
- Modules provide clear organizational boundaries, prevent namespace pollution, and protect internal state invariants from unauthorized external mutation.

### Source
- *scope-closures/ch8.md, lines 1-60.*

## Section: What Is a Module?

### Summary & Comparisons
- **Namespace (Stateless Grouping):** A collection of grouped utility functions without internal persistent state (e.g., `Utils.isValidEmail(..)`). Grouping functions alone does not make a module.
- **Data Structure (Stateful Grouping without Access Control):** Bundles state and methods (e.g., a plain object literal with properties and `this` methods) but leaves all internal properties publicly accessible, lacking visibility control.
- **True Module (Stateful Access Control):** Combines three pillars:
  1. Grouping of related data and functions.
  2. Maintained state over time (stateful).
  3. Strict access control dividing hidden *private* details from an exposed *public API*.

### Criteria Checklist
- A structure is only a module if it manages state **and** hides internal data behind a controlled public API.

### Source
- *scope-closures/ch8.md, lines 61-140.*

## Section: Classic Modules (Singleton via IIFE)

### Core Concepts
- **Revealing Module Pattern:** An outer function creates an enclosed lexical scope holding private variables. It returns a `publicAPI` object containing references to inner functions.
- **Closure Mechanism:** Public methods maintain live closures back to the enclosed variables (`records`) inside the factory/IIFE scope.
- **Singleton by Execution:** Wrapping the module definition in an IIFE `(function defineStudent(){ ... })()` instantiates the module exactly once at startup.
- **Private by Default:** Any variable or helper function not explicitly exported in the returned object remains unreachable outside the module.

### Code Pattern
```js
var Student = (function defineStudent(){
var records = [ /* private state */ ];
function getName(id) { /* accesses records via closure */ }
return { getName };
})();
```

### Source
- *scope-closures/ch8.md, lines 141-210.*

## Section: Module Factory (Multiple Instances)

### Summary
- **Module Factory:** Converting an IIFE into a standalone callable function (`function defineStudent() { ... }`) allows producing multiple independent module instances on demand.
- **Independent State & Closures:** Each call to the factory produces a separate lexical scope environment; methods on instance A close over instance A's state without interfering with instance B.

### Three Requirements of Classic Modules
1. An outer enclosing scope (run via factory or IIFE at least once).
2. Hidden state inside that inner scope.
3. A returned public API containing at least one function with closure over the hidden state.

### Source
- *scope-closures/ch8.md, lines 211-260.*

## Section: Node CommonJS Modules

### Core Concepts
- **File-Based & Module-Scoped:** One module per file. Top-level variables reside in the module wrapper scope (not global scope) and are private by default.
- **Exposing API:** Properties are attached to `module.exports` (e.g., `module.exports.getName = getName;`).
- **Object Replacement Caveat:** Reassigning `module.exports = { ... }` directly can break circular dependency references. Prefer adding properties or using `Object.assign(module.exports, { ... })`.
- **Singleton Behavior & require:** Calling `require("/path/to/module.js")` executes the module once and caches the result; subsequent `require` calls return references to the same singleton instance.

### Source
- *scope-closures/ch8.md, lines 261-355.*

## Section: Modern ES Modules (ESM)

### Core Features
- **Strict by Default:** All ESM files are automatically parsed and executed in strict mode.
- **Top-Level Constraint:** `import` and `export` statements must strictly reside at the top-level scope (cannot be nested inside blocks or functions).
- **Export Variations:**
  - *Named exports:* `export { getName };` or `export function getName() {}` (the latter is hoisted).
  - *Default export:* `export default function getName() {}`.
- **Import Variations:**
  - *Named import:* `import { getName } from "./students.js";`
  - *Renamed import:* `import { getName as getStudentName } from "./students.js";`
  - *Default import:* `import getName from "./students.js";`
  - *Namespace import:* `import * as Student from "./students.js";`

### Source
- *scope-closures/ch8.md, lines 356-470.*

## Section: Exit Scope

### Synthesis of the Book
- **Lexical Scope:** Provides the rules and boundaries for variable storage, resolution, and collision prevention.
- **POLE (Least Exposure):** Directs developers to defensively scope variables to the smallest possible blocks or functions.
- **Closure:** The runtime mechanism that preserves access to in-scope variables across asynchronous boundaries or outside function scopes.
- **Modules (The Culmination):** The ultimate design pattern uniting lexical scope, POLE, and closures to achieve robust, maintainable, and scalable application architecture.

### Takeaway
- Regardless of module format (Classic, CommonJS, or ESM), every robust JavaScript architectural pattern relies fundamentally on lexical scope rules and closures.

### Source
- *scope-closures/ch8.md, lines 471-505.*
