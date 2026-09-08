# Chapter 2 — Surveying JS

> Independent study notes for *You Don't Know JS Yet*, 2nd Edition,
> Get Started, Chapter 2.

## Main Idea

JavaScript is a language with several connected parts:

- values and types;
- variables;
- functions;
- comparisons;
- objects and classes;
- modules;
- ES Modules.

This chapter provides a high-level survey of these concepts. It is not
intended to explain every detail. Its purpose is to create a map of the
language before the following chapters examine each subject more deeply.

The goal is to understand the basic nature of JavaScript and to build
accurate expectations about how its core features behave.

## Study Method

Use the following cycle:

Read → Predict → Run → Explain

1. Read each example carefully.
2. Predict the result before executing it.
3. Run the example in a known JavaScript environment.
4. Explain the result using JavaScript concepts.
5. Modify the example and predict the new result.

Pay special attention to:

- the type of each value;
- whether two variables share the same reference;
- the scope in which a variable exists;
- whether an operation performs coercion;
- whether a function returns a value or only produces a side effect.

## 1. Each File Is a Program

In JavaScript, each file can be treated as an independent program.

A project may contain many JavaScript files. Build tools can analyze their
dependencies and combine or prepare them for execution.

A useful model is:
```text
Several source files
↓
Dependency analysis
↓
Build or bundling process
↓
Executable application

The organization of source files is therefore part of how a JavaScript
application is structured.

## 2. Values

JavaScript programs work with values.

Values can be:

- assigned to variables;
- passed to functions;
- returned from functions;
- stored in objects and arrays;
- compared with other values.

### Primitive Values

The primitive value types discussed in this chapter include:

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `bigint`
- `symbol`

Examples:

js
const name = "Sara";
const age = 25;
const active = true;
const emptyValue = null;
let result;
const largeNumber = 123n;
const identifier = Symbol("id");

### Objects

Objects are values that can contain properties.

js
const user = {
  name: "Sara",
  age: 25,
};

Arrays are also objects:

js
const numbers = [1, 2, 3];

An object or array can contain other values, including functions.

### `typeof`

The `typeof` operator returns a string describing the type of a value.

js
typeof "hello";    // "string"
typeof 42;         // "number"
typeof true;       // "boolean"
typeof undefined;  // "undefined"

Some results require special attention:

js
typeof null; // "object"
typeof [];   // "object"

`typeof null` returns `"object"` because of a historical behavior in
JavaScript.

`typeof` is useful, but it does not always provide a complete or precise
classification of a value.

## 3. Declaring and Using Variables

Variables provide names through which values can be accessed.

JavaScript has three main variable declarations:

- `var`
- `let`
- `const`

### `var`

`var` is function-scoped.

js
function example() {
  var value = 10;

  console.log(value);
}

A `var` declaration belongs to the surrounding function scope rather than
to an individual block.

### `let`

`let` is block-scoped.

js
{
  let value = 10;
  console.log(value);
}

// value is not available here

The variable exists only inside the block where it is declared.

### `const`

`const` is also block-scoped, but it does not allow reassignment.

js
const score = 100;

score = 200; // TypeError

The variable must also be initialized when it is declared:

js
const name = "Sara";

### Reassignment and Mutation

Reassignment and mutation are different operations.

**Reassignment** changes what a variable refers to:

js
let value = 1;

value = 2;

**Mutation** changes the contents of an object or array:

js
const user = {
  name: "Sara",
};

user.name = "Mina";

The second example is valid. The variable `user` still refers to the same
object; only the object's contents changed.

Therefore:

text
const prevents reassignment.
const does not automatically make an object immutable.

Arrays can also be mutated through a `const` binding:

js
const numbers = [1, 2];

numbers.push(3); // valid

But assigning a new array is not allowed:

js
numbers = [4, 5]; // TypeError

### Scope

Scope determines where a variable can be accessed.

A useful distinction is:

text
var   → function scope
let   → block scope
const → block scope

Understanding scope is essential for understanding functions, modules, and
closures.

## 4. Functions

A function is a reusable unit of behavior.

js
function greet(name) {
  return `Hello, ${name}`;
}

console.log(greet("Sara"));
// Hello, Sara

### Parameters and Arguments

A parameter is the name used in a function definition:

js
function greet(name) {
  // name is a parameter
}

An argument is the value supplied during a function call:

js
greet("Sara");
// "Sara" is an argument

text
Parameter → appears in the function definition
Argument  → appears in the function call

### Return Values

`return` sends a value back to the code that called the function:

js
function add(a, b) {
  return a + b;
}

const result = add(2, 3);

console.log(result); // 5

`console.log` is different:

js
function showSum(a, b) {
  console.log(a + b);
}

This function displays a value, but it does not necessarily return that
value to the caller.

text
return      → produces a value for the caller
console.log → displays a value as a side effect

### Functions Are Values

Functions are first-class values in JavaScript.

They can be:

- assigned to variables;
- passed as arguments;
- returned from other functions;
- stored in objects;
- stored in arrays.

js
function greet() {
  return "Hello";
}

const fn = greet;

console.log(fn());
// Hello

The function itself was assigned to `fn`; it was not called during the
assignment.

### Passing Functions as Arguments

js
function runOperation(operation) {
  return operation();
}

function getMessage() {
  return "Done";
}

console.log(runOperation(getMessage));
// Done

This ability is central to callbacks, functional programming, and many
JavaScript APIs.

## 5. Comparisons

Comparisons produce boolean results:

js
10 > 5;  // true
10 === 5; // false

JavaScript provides several comparison operators with different behavior.

### Strict Equality: `===`

`===` compares values without performing ordinary implicit type coercion.

js
42 === 42;    // true
42 === "42";  // false

The second comparison is false because the values have different types.

### Loose Equality: `==`

`==` may perform type coercion before comparing values:

js
42 == "42"; // true

The string is converted for the purpose of comparison.

This can produce results that are difficult to predict unless the coercion
rules are understood.

### Important Examples

js
0 == false;  // true
0 === false; // false

The strict comparison makes the type difference visible.

### `NaN`

`NaN` means “Not a Number,” but it is still a value of the number type.

A notable behavior is:

js
NaN === NaN; // false

`NaN` is not equal to itself under ordinary equality.

`Object.is` treats the two `NaN` values as the same:

js
Object.is(NaN, NaN); // true

### Comparing Objects

Objects are compared by reference, not by their contents.

js
{} === {}; // false

These are two different object values.

Even though they look identical, they occupy different references.

js
const first = {};
const second = first;

first === second; // true

Here both variables refer to the same object.

This distinction is important:

text
Same contents  ≠ necessarily the same object
Same reference = the same object

### Relational Comparisons

Relational operators such as `<` and `>` can perform different kinds of
comparison depending on the operands.

Numbers are compared numerically:

js
10 < 9; // false

Strings can be compared lexically:

js
"10" < "9"; // true

The strings are compared as text, character by character, rather than as
the numbers 10 and 9.

## 6. How We Organize in JS

JavaScript provides multiple ways to organize related data and behavior.

Two important approaches are:

- classes;
- modules.

## 6.1 Classes

A class can be used as a pattern for creating objects.

js
class Notebook {
  constructor() {
this.pages = [];
  }

  addPage(text) {
this.pages.push(text);
  }

  print() {
console.log(this.pages);
  }
}

Creating an instance:

js
const notebook = new Notebook();

notebook.addPage("Learn JavaScript");
notebook.print();

### Class and Instance

The class is the definition or pattern:

text
Notebook → class

An object created from that class is an instance:

js
const firstNotebook = new Notebook();
const secondNotebook = new Notebook();

Each instance can have its own state.

### `this`

`this` is commonly used to access data belonging to the current instance.

js
class Counter {
  constructor() {
this.count = 0;
  }

  increment() {
this.count++;
  }
}

const counter = new Counter();

counter.increment();

console.log(counter.count);
// 1

In this example, `this.count` refers to the `count` property of the
instance on which `increment` is called.

### Inheritance with `extends`

A class can extend another class:

js
class Publication {
  print() {
console.log("Publication");
  }
}

class Book extends Publication {
  read() {
console.log("Reading book");
  }
}

A `Book` instance can use both methods:

js
const book = new Book();

book.print();
book.read();

### Method Overriding

A child class can define a method with the same name as a method in the
parent class:

js
class Publication {
  print() {
console.log("Publication");
  }
}

class Book extends Publication {
  print() {
console.log("Book");
  }
}

const book = new Book();

book.print();
// Book

The child implementation overrides the inherited implementation for the
`Book` instance.

### `super`

`super` can be used to call the parent implementation:

js
class Book extends Publication {
  print() {
super.print();
console.log("Book");
  }
}

The result is:

text
Publication
Book

`super.print()` calls the `print` method from the parent class.

## 6.2 Classic Modules

A classic module can be created with a factory function.

js
function createCounter() {
  let count = 0;

  function increment() {
count++;
  }

  function getCount() {
return count;
  }

  return {
increment,
getCount,
  };
}

Usage:

js
const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getCount());
// 2

### Private State

The `count` variable is inside the function's scope:

js
let count = 0;

It is not directly exposed through the returned object.

js
console.log(counter.count);
// undefined

However, the returned functions can still access it:

js
counter.getCount();
// 2

This is possible because the functions retain access to the surrounding
scope. This behavior is associated with closures.

### Public API

The returned object defines the module's public API:

js
return {
  increment,
  getCount,
};

Only the properties placed on this object are directly available to code
outside the module.

text
Private:
- count

Public:
- increment
- getCount

### Class and Module

| Feature | Class | Module |
| --- | --- | --- |
| Main purpose | Define a pattern for objects | Encapsulate data and behavior |
| Usual creation | `new ClassName()` | Calling a factory function |
| State access | Often through `this` | Through closure and scope |
| Result | An instance | A public API |
| Common tools | `class`, `extends`, `super` | Functions, scope, closures |

A simple mental model:

text
Class:
definition → new → instance

Module:
factory function → execution → private scope + public API

## 7. ES Modules

ES Modules are JavaScript's standardized module system.

They use:

- `export` to make values available;
- `import` to use exported values from another module.

### Exporting Values

js
// math.js
export function add(a, b) {
  return a + b;
}

A named export can be imported by another file:

js
// app.js
import { add } from "./math.js";

console.log(add(2, 3));
// 5

### Named Exports

Named exports are imported using their exported names:

js
export const version = "1.0";
export function greet(name) {
  return `Hello, ${name}`;
}

js
import { version, greet } from "./library.js";

An alias can be used locally:

js
import { add as sum } from "./math.js";

console.log(sum(2, 3));

### Default Exports

A module can also provide a default export:

js
export default function greet() {
  return "Hello";
}

It can be imported with a local name:

js
import greet from "./greet.js";

The local name does not have to match the original function name.

### Module Boundaries

ES Modules help define explicit boundaries between files.

A module can:

- hide implementation details;
- expose a deliberate public API;
- declare its dependencies;
- reduce reliance on global variables;
- make a project easier to maintain.

Each module is evaluated as a module, and imported references are managed
through the module system.

## 8. The Rabbit Hole Deepens

This chapter is a broad survey rather than a complete explanation of every
JavaScript feature.

It is normal for some topics to remain unclear after a first reading.
The following chapters will examine these ideas in greater detail.

The chapter should be revisited several times because it provides the
foundation for deeper study.

The main lesson is:

text
This chapter provides a map of JavaScript.
The following chapters explore the individual areas in depth.

## Key Distinctions

### Primitive vs. Object

text
Primitive → basic JavaScript value
Object    → value that can contain properties

### Reassignment vs. Mutation

text
Reassignment → changing what a variable refers to
Mutation     → changing the contents of an object or array

### Parameter vs. Argument

text
Parameter → name in the function definition
Argument  → value supplied in the function call

### `return` vs. `console.log`

text
return      → sends a value back to the caller
console.log → displays a value

### `===` vs. `==`

text
=== → strict comparison without ordinary implicit coercion
==  → comparison that may perform type coercion

### Class vs. Module

text
Class  → pattern for creating instances
Module → encapsulated scope with a public API

### Object Contents vs. Object Reference

text
Equal-looking objects may still be different objects.
Two variables are equal by reference when they point to the same object.

## Practice

### Exercise 1 — Values and Types

Predict the result:

js
console.log(typeof "42");
console.log(typeof 42);
console.log(typeof null);
console.log(typeof []);

Explain each result.

### Exercise 2 — Reassignment and Mutation

Predict which lines are valid:

js
const user = {
  name: "Sara",
};

user.name = "Mina";
user = {
  name: "Ali",
};

Explain the difference between the two operations.

### Exercise 3 — Functions as Values

What is printed?

js
function greet(name) {
  return `Hello, ${name}`;
}

const fn = greet;

console.log(fn("Sara"));

Explain why assigning `greet` to `fn` does not call the function immediately.

### Exercise 4 — Equality

Predict the result of each comparison:

js
console.log(42 === "42");
console.log(42 == "42");
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log({} === {});

Explain the role of type coercion, special `NaN` behavior, and references.

### Exercise 5 — Classes

What is printed?

js
class Animal {
  speak() {
console.log("Animal sound");
  }
}

class Dog extends Animal {
  speak() {
console.log("Woof");
  }
}

const dog = new Dog();

dog.speak();

Explain why the `Dog` implementation is used.

### Exercise 6 — `super`

Predict the output:

js
class Publication {
  print() {
console.log("Publication");
  }
}

class Book extends Publication {
  print() {
super.print();
console.log("Book");
  }
}

new Book().print();

### Exercise 7 — Module Privacy

What are the two outputs?

js
function createSecret() {
  const secret = 123;

  return {
readSecret() {
return secret;
},
  };
}

const box = createSecret();

console.log(box.readSecret());
console.log(box.secret);

Explain why the first expression returns `123` and the second produces
`undefined`.

### Exercise 8 — ES Modules

Assume the following files exist.

js
// math.js
export function multiply(a, b) {
  return a * b;
}

js
// app.js
import { multiply } from "./math.js";

console.log(multiply(4, 5));

What is printed? Which file defines the function, and which file uses it?

## Completion Checklist

- [ ] I can explain why each JavaScript file can be treated as a program.
- [ ] I can distinguish primitive values from objects.
- [ ] I understand the important behavior of `typeof`.
- [ ] I can explain the scope differences between `var`, `let`, and `const`.
- [ ] I can distinguish reassignment from mutation.
- [ ] I can distinguish parameters from arguments.
- [ ] I understand the difference between `return` and `console.log`.
- [ ] I understand that functions are first-class values.
- [ ] I can explain the difference between `===` and `==`.
- [ ] I understand why `NaN === NaN` is false.
- [ ] I understand reference-based object comparison.
- [ ] I can create a class and an instance.
- [ ] I can explain the roles of `this`, `extends`, and `super`.
- [ ] I understand how a factory function can create a module.
- [ ] I understand how closure can preserve access to private state.
- [ ] I can identify a module's public API.
- [ ] I understand the basic roles of `import` and `export`.
- [ ] I can explain why this chapter is a survey rather than a complete
treatment of JavaScript.

## Long-Term Goal

Explain JavaScript behavior using the language's underlying concepts:

- values and types;
- scope and references;
- functions and closures;
- coercion and comparison;
- objects and inheritance;
- modules and boundaries.

The aim is to understand unfamiliar JavaScript code from first principles
instead of relying on memorized outputs or framework-specific assumptions.

These notes are an independent study companion and are not a reproduction
of the original book.


**منبع فصل:** `You-Dont-Know-JS-2nd-ed/get-started/ch2.md`، خطوط ۱۸ تا ۸۷۷.