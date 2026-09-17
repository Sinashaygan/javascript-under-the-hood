# Chapter 1 — Primitive Values

## Overview

JavaScript has **7 primitive types**:

* `undefined`
* `null`
* `boolean`
* `number`
* `bigint`
* `symbol`
* `string`

Primitive values are **not objects**.

A key idea in JavaScript is:

> **Types belong to values, not variables.**

A variable does not have a permanent type. Its current value has a type.

```js
let x = 42;
typeof x; // "number"

x = "hello";
typeof x; // "string"
```

The same variable can hold values of completely different types.

```js
let value = true;
value = 100;
value = "JavaScript";
```

The type changes because the **value changes**.

## Primitive vs Object

Primitive values are different from objects.

Objects can have properties:

```js
const user = {
  name: "Sina"
};

user.name; // "Sina"
```

Primitives do not behave like normal objects:

```js
let value = "hello";

value.name = "Sina";

console.log(value.name); // undefined
```

However, JavaScript allows some property access on primitives through automatic boxing/wrapping:

```js
"hello".length; // 5
```

This behavior will be explained in more detail later.

## The `typeof` Operator

The `typeof` operator tells us the type of the current value.

It always returns a **string**:

```js
typeof 42;        // "number"
typeof "hello";   // "string"
typeof true;      // "boolean"
typeof undefined; // "undefined"
typeof 10n;       // "bigint"
typeof Symbol();  // "symbol"
```

For objects:

```js
typeof {};        // "object"
typeof [];        // "object"
typeof function() {}; // "function"
```

### Important `null` Exception

There is a historical JavaScript quirk:

```js
typeof null; // "object"
```

This does **not** mean that `null` is actually an object.

`null` is a primitive value. The result `"object"` is simply an old behavior that JavaScript keeps for compatibility.

### Why `typeof` Is Useful

It is often used to check the type of a value:

```js
const value = 42;

if (typeof value === "number") {
  console.log("It's a number");
}
```

For undeclared identifiers, `typeof` has a special safe behavior:

```js
typeof undeclaredVariable; // "undefined"
```

Normally, directly accessing an undeclared identifier throws an error:

```js
undeclaredVariable; // ReferenceError
```

## `null` and `undefined`

JavaScript has two primitive values that represent the absence of a value:

* `undefined`
* `null`

They are **different primitive types**.

```js
typeof undefined; // "undefined"
typeof null;      // "object"  // historical quirk
```

### `undefined`

`undefined` commonly appears when:

* A variable has not been initialized.
* An object property does not exist.
* A function does not explicitly return a value.
* An argument is missing.

```js
let x;

console.log(x); // undefined
```

Missing property:

```js
const user = {};

console.log(user.name); // undefined
```

Missing argument:

```js
function greet(name) {
  console.log(name);
}

greet(); // undefined
```

### Checking for Nullish Values

This checks for either `null` or `undefined`:

```js
value == null;
```

It is one of the cases where loose equality can be intentional.

The nullish coalescing operator also works with both:

```js
const name = value ?? "Guest";
```

The default is used only when `value` is `null` or `undefined`.

### Optional Chaining

Optional chaining safely accesses a property when the left side may be nullish:

```js
user?.name;
```

It checks for:

```js
null
undefined
```

It does **not** mean "check whether the property exists in every possible situation."

For example:

```js
fn?.();
```

If `fn` is `null` or `undefined`, nothing happens.

But if `fn` contains a non-function value, JavaScript can still throw:

```js
const fn = 42;

fn?.(); // TypeError
```

Use optional chaining when the absence of a value is an expected possibility. Overusing it can hide bugs.

### Default Parameters

A default parameter is used when the argument is missing or `undefined`:

```js
function greet(name = "Guest") {
  console.log(name);
}

greet();          // "Guest"
greet(undefined); // "Guest"
greet(null);      // null
```

Notice that `null` does **not** trigger the default value.

## Boolean

The Boolean type has only two values:

```js
true
false
```

Booleans are commonly used in conditions:

```js
if (isLoggedIn) {
  console.log("Welcome!");
}
```

They are also used with operators such as:

```js
!
```

Example:

```js
const active = true;

console.log(!active); // false
```

## String

A string is a sequence of characters.

JavaScript supports:

```js
"hello"
'hello'
`hello`
```

Examples:

```js
const firstName = "Sina";
const message = 'Hello';
const text = `JavaScript`;
```

An empty string is also valid:

```js
const empty = "";
```

### String Length

```js
"hello".length; // 5
```

However, `.length` counts **UTF-16 code units**, not necessarily visible characters.

For example:

```js
"😀".length; // 2
```

A single visible character can therefore have a length greater than `1`.

### Unicode and Combining Characters

Two strings can look identical but contain different Unicode sequences:

```js
"é" === "e\u0301"; // false
```

Unicode normalization can be used when logically equivalent representations need to be compared.

### Escape Sequences

Common escape sequences include:

```js
"\n"       // newline
"\t"       // tab
"\\"       // backslash
"\xA9"     // ©
"\u00A9"   // ©
"\u{1F386}" // 🎆
```

### Template Literals

Template literals use backticks and can contain interpolation:

```js
const name = "Sina";

const message = `Hello, ${name}!`;

console.log(message);
// Hello, Sina!
```

They can also contain real line breaks:

```js
const text = `Line one
Line two`;
```

### Tagged Templates

A tagged template calls a function using template-literal syntax:

```js
tag`Hello ${name}`;
```

The function can process the template and return any value, not necessarily a string.

Also remember that a strict-mode directive must use a normal string:

```js
"use strict";
```

Not:

```js
`use strict`;
```
