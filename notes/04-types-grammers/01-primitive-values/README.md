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
