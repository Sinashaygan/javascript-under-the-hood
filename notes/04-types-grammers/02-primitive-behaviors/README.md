# Chapter 2: Primitive Behaviors

> Summary notes from **You Don't Know JS Yet: Types & Grammar — 2nd Edition**

## Overview

This chapter focuses on how JavaScript **primitive values** behave, especially:

* Immutability
* Strings
* Numbers
* BigInts
* Equality
* Type coercion
* Numeric operations
* Floating-point precision
* Bitwise operations

---

## 1. Primitive Values & Immutability

JavaScript has seven primitive types:

```js
null
undefined
boolean
string
number
bigint
symbol
```

Primitive values are **immutable**.

```js
let greeting = "Hello";

greeting[0] = "J";

console.log(greeting);
// "Hello"
```

The original String cannot be changed.

Reassigning a variable means giving it a new value:

```js
let age = 42;

age = 43;
```

`42` did not become `43`; the variable now refers to another value.

---

## 2. `const` Does Not Mean Immutable

`const` prevents **reassignment**, not mutation of an object.

```js
const user = {
    name: "Sina"
};

user.name = "Ali"; // ✅
```

But:

```js
const age = 42;

age = 43; // ❌ TypeError
```

Therefore:

```text
const !== immutable
```

---

## 3. Primitive Assignment

Primitive values are copied when assigned to another variable.

```js
let age = 42;

let anotherAge = age;

age = 43;

console.log(age);
// 43

console.log(anotherAge);
// 42
```

Changing `age` does not affect `anotherAge`.

---

## 4. Strings

Strings are primitive and immutable.

```js
let name = "Sina";

console.log(typeof name);
// "string"
```

Strings support indexing:

```js
let greeting = "Hello";

console.log(greeting[0]);
// "H"

console.log(greeting[4]);
// "o"
```

However, a String is **not an Array**.

Strings are also iterable:

```js
for (let char of "Kyle") {
    console.log(char);
}
```

Or:

```js
console.log([..."Kyle"]);
// ["K", "y", "l", "e"]
```

---

