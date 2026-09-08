# Chapter 1 — What Is JavaScript?

> Independent study notes for *You Don't Know JS Yet*, 2nd Edition,
> Get Started, Chapter 1.

## Main Idea

Learning JavaScript is a direction, not a destination.

The goal is not to memorize isolated syntax or surprising outputs.
The goal is to build an accurate mental model of the language and use
that model to understand unfamiliar code.

Framework experience is useful, but understanding JavaScript requires
studying the language independently of any particular framework.

## Study Method

Use the following cycle:

Read → Predict → Run → Explain

1. Read the explanation and example carefully.
2. Predict the result before executing the code.
3. Run the example in a known environment.
4. Explain the result in your own words.
5. Modify the example and repeat.

When a prediction is wrong, identify the assumption that caused it.

## 1. About This Book

JavaScript knowledge develops through repeated study and practice.

Reading a definition once is not the same as understanding how that
concept behaves in different situations.

### Study Principles

- Do not rush through the material.
- Read examples carefully.
- Predict behavior before running code.
- Explain the result in your own words.
- Revisit concepts that remain unclear.
- Practice by modifying small examples.
- Separate language behavior from framework conventions.

### Major Themes

The series develops several connected areas of JavaScript:

- scope and closures;
- objects and prototypes;
- types and coercion.

These topics support a more reliable understanding of everyday code.

## 2. JavaScript and ECMAScript

JavaScript and Java are different languages.

The name JavaScript has historical and marketing origins; it does not
mean that JavaScript is a smaller version of Java.

ECMAScript is the standardized language specification associated with
JavaScript.

### Useful Distinction

- **JavaScript:** the name commonly used for the language.
- **ECMAScript:** the standardized specification.
- **TC39:** the committee responsible for developing that specification.

The specification defines language syntax and behavior. Engines implement
those rules.

## 3. Specification, Engine, and Host Environment

These three concepts should not be treated as interchangeable.

### Language Specification

Defines the language's not be treated as interchangeable.

### Language Specification

Defines the language's rules.

Examples include values are converted;
- how objects and properties work.

### JavaScript Engine

An implementation that processes and executes JavaScript.

Examples include V8, SpiderMonkey, and JavaScriptCore.

An engine must implement language behavior, but its internal optimization
strategies are not the language specification itself.

### Host Environment

The surrounding environment that runs JavaScript and exposes additional
capabilities.

Examples include browsers and Node.js.

A browser can provide DOM APIs. Node.js.

 provide filesystem APIs.
These capabilities are not all part of ECMAScript.

### Example
```js
const heading = document.querySelector("h1");
heading.textContent = "Hello";

This example combines:

- JavaScript syntax, variables, property access, and function calls;
- a browser-provided `document` object and DOM APIs.

A JavaScript engine alone does not imply that `document` exists.

### Mental Model

Specification → implemented by an engine
Host environment → exposes capabilities around that engine

## 4. JavaScript Is Not Limited to the Web

JavaScript can run in different host environments.

The core language remains JavaScript, but the available APIs and execution
context can differ.

Do not assume that code using a browser API can run unchanged in every
JavaScript environment.

Likewise, Node.js-specific APIs are not automatically available in a browser.

## 5. Developer Tools Are Not available in a browser.

## 5. Developer Tools Are Not the an interactive
tool with its own behavior.

The console may:

- display results automatically;
- format objects in a tool-specific way;
- provide convenience helpers;
- handle repeated declarations differently from an ordinary source file.

When behavior is surprising, reproduce it in a small script or module
rather than relying only on an interactive console session.

## 6. JavaScript Is Multi-Paradigm

JavaScript supports multiple programming styles.

### Procedural Style

Organize work as a sequence of operations.

js
let total = 0;

for (const price of [10, 20, 30]) {
  total += price;
}

### Object-Oriented Style

Group state and behavior through objects.

js
const cart = {
  total: 0,

  add(price) {
this.total += price;
  },
};

cart.add(10);

JavaScript's object model is based on prototypes.
Class syntax does not replace that underlying model.

### Functional Style

Use functions to transform and compose values.

js
const prices = [10, 20, 30];
const doubled = prices.map(price => price * 2);

JavaScript does not require choosing one style for every problem.

The important question is which style makes the behavior easier to
understand and maintain.

## 7. Backward and Forward Compatibility

### Backward Compatibility

Older valid JavaScript is generally expected to continue working in
newer implementations.

Direction:

Old code → newer engine

This is a major language-design commitment, not an absolute guarantee
about every historical browser behavior or host API.

### Forward Compatibility

An older engine is not automatically able to understand newer JavaScript.

Direction:

New code → older engine

Unsupported syntax can produce a parsing error before the relevant code
has a chance to execute.

### Important Consequence

Putting unsupported syntax inside a conditional does not necessarily
protect an older engine from a parsing error.

Parsing and executing a branch are different steps.

## 8. Transpiling

Transpiling transforms source code into another source representation.

In compatibility workflows, this often means converting newer syntax
into syntax supported by older target environments.

### Illustrative Example

Input:

js
const message = `Hello, ${name}!`;

Possible older-syntax output:

js
var message = "Hello, " + name + "!";

This illustrates the goal, not a universal transformation rule.

Real transformations must preserve observable behavior. For example,
replacing every `let` with `var` is not generally correct because their
scope behavior differs.

### Key Point

Transpiling primarily addresses syntax compatibility.

It does not automatically provide every missing runtime API.

## 9. Polyfilling

A polyfill provides an implementation of an API that an environment lacks.

The general idea is:

1. Check whether the API exists.
2. Supply a compatible implementation if it does not.

### Conceptual Example

js
if (typeof Array.prototype.includes !== "function") {
  // Install a standards-compatible implementation.
}

This is a detection sketch, not a complete polyfill.

Correct polyfills may need to handle subtle details involving coercion,
edge cases, and property descriptors.

### Key Point

Polyfills provide runtime functionality.

They cannot teach an older parser how to understand new syntax.

### Transpiler vs. Polyfill

| Problem | Typical solution |
| --- | --- |
| The engine cannot parse newer syntax | Transpilation |
| A required built-in API is missing | Polyfill, where feasible |
| Both syntax and runtime support are missing | A combination |

Not every new capability can be faithfully polyfilled.

## 10. Parsing, Compilation, and Execution

Calling JavaScript "just an interpreted language" is an incomplete
mental model.

JavaScript engines process and analyze source code before executing it.
Modern engines may combine interpretation, compilation, and optimization.

A useful conceptual model is:

Source code → parsing and analysis → execution

This is not a requirement that every engine use an identical pipeline.

### Syntax Error Example

js
console.log("Will this run?");

const value = ;

In an ordinary script containing this syntax error, the earlier log does
not execute: parsing the script fails.

### Runtime Error Example

js
console.log("Started");

throw new Error("Stopped");

console.log("Finished");

Here parsing succeeds. Execution prints `"Started"` and then stops at the
uncaught error.

### Key Distinction

- **Syntax:** the rules governing valid code structure.
- **Semantics:** the meaning and behavior of valid code.

## 11. Strict Mode

Strict mode changes certain language rules and rejects some problematic
behaviors.

For an ordinary script, it can be enabled with a directive:

js
"use strict";

accidentalGlobal = 42;
// ReferenceError, assuming no such binding exists.

Without strict mode, assignment to an otherwise unresolvable identifier
can create a property on the global object.

Strict mode helps expose such mistakes.

### Important Notes

- ECMAScript modules are automatically strict.
- Class bodies use strict-mode semantics.
- Strict mode is not TypeScript.
- Strict mode does not add static type checking.
- Strict mode does not mean "use the newest JavaScript version."

## 12. Frontend Perspective

Experience with React, Next.js, and TypeScript is useful, but it does not
automatically imply a complete JavaScript mental model.

### React

React frequently exposes JavaScript concepts such as:

- closures in event handlers and effects;
- function identity;
- object identity;
- reference sharing;
- asynchronous scheduling;
- module behavior.

Understanding the language helps distinguish a JavaScript issue from a
React-specific rule.

### Next.js

Code may run in different environments.

Before using an API, ask:

- Does this code execute on the server or in the browser?
- Is this API available in that environment?
- Is this a build-time issue or a runtime issue?

### TypeScript

TypeScript provides static analysis and syntax that tooling transforms
into JavaScript.

Type annotations do not validate arbitrary runtime data by themselves.

ts
function double(value: number) {
  return value * 2;
}

The annotation helps the type checker, but it does not insert a runtime
check that rejects every non-number input.

JavaScript runtime semantics still matter.

## 13. Common Misconceptions

| Misconception | Better mental model |
| --- | --- |
| JavaScript is a version of Java | They are different languages |
| Every browser API belongs to JavaScript | Distinguish ECMAScript from host APIs |
| JavaScript only runs in browsers | JavaScript runs in multiple environments |
| New JavaScript always runs in old browsers | Compatibility may require tooling |
| Polyfills fix unsupported syntax | Syntax usually requires transformation |
| Transpilers provide every missing API | Runtime APIs may need separate support |
| JavaScript only reads and executes one line at a time | Parsing and analysis matter before execution |
| TypeScript replaces JavaScript behavior | JavaScript still defines runtime semantics |
| Knowing React means knowing JavaScript deeply | Framework knowledge and language knowledge overlap but differ |

## 14. Practice

### Exercise 1 — Language or Host?

Classify each item:

- `Array`
- `Promise`
- `document`
- `document.querySelector`
- `setTimeout`

Explain why familiar APIs are not necessarily ECMAScript features.

### Exercise 2 — Compatibility

An old environment cannot parse arrow functions and does not provide
`Array.prototype.includes`.

Which problem calls for transpilation?
Which problem calls for runtime API support?

### Exercise 3 — Parsing vs. Execution

Predict the result of these separate scripts.

Script A:

js
console.log("A");

const broken = ;

Script B:

js
console.log("B");

throw new Error("Failure");

Explain why the first log behaves differently in the two scripts.

### Exercise 4 — Strict Mode

Run this in a fresh ordinary script:

js
"use strict";

studyScore = 100;

Explain the result, assuming `studyScore` was not previously declared.

### Exercise 5 — Explain Without Frameworks

Answer in your own words:

1. What is the difference between JavaScript and ECMAScript?
2. What does an engine do?
3. What does a host environment provide?
4. Why can a polyfill not fix unsupported syntax?
5. Why does TypeScript not eliminate runtime validation?

## Completion Checklist

- [ ] I can distinguish the specification, engine, and host environment.
- [ ] I can explain why JavaScript is not Java.
- [ ] I can describe JavaScript as a multi-paradigm language.
- [ ] I can distinguish backward and forward compatibility.
- [ ] I can distinguish transpilation and polyfilling.
- [ ] I can distinguish parsing errors and runtime errors.
- [ ] I can explain the purpose of strict mode.
- [ ] I can distinguish JavaScript semantics from TypeScript checks.
- [ ] I can explain my predictions instead of only reporting outputs.

## Long-Term Goal

Explain JavaScript behavior from language principles instead of relying
on memorized rules or framework-specific guesses.

These notes are an independent study companion and are not a reproduction
of the original book.
```