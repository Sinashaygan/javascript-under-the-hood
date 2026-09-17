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
