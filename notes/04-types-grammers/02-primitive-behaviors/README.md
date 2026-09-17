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


## 5. String Length & Unicode

`length` does not always represent the number of visible characters.

```js
let emoji = "📱";

console.log(emoji.length);
// 2
```

While:

```js
console.log([...emoji].length);
// 1
```

This happens because JavaScript Strings use **UTF-16 code units**.

Unicode and emoji can therefore behave differently from what we visually consider a single character.

---

## 6. Equality & Type Coercion

### `===`

Strict equality does not perform type coercion:

```js
"42" === "42";
// true

"42" === 42;
// false
```

### `==`

Loose equality can perform type coercion:

```js
42 == "42";
// true
```

The String can be converted to a Number before comparison.

### `Object.is()`

`Object.is()` behaves differently for some special values:

```js
Object.is(NaN, NaN);
// true

Object.is(-0, 0);
// false
```

Compare this with:

```js
NaN === NaN;
// false

-0 === 0;
// true
```

---

## 7. String Operations & Coercion

The `+` operator can perform String concatenation:

```js
"Hello " + "Sina";
// "Hello Sina"

"5" + 2;
// "52"
```

Other arithmetic operators generally coerce Strings to Numbers:

```js
"5" - 2;
// 3

"5" * 2;
// 10

"5" / 2;
// 2.5
```

Unary `+` can also convert a numeric String:

```js
+"42";
// 42
```

Useful String methods include:

```js
"hello".toUpperCase();
// "HELLO"

"hello".includes("ell");
// true

"hello".startsWith("he");
// true

"hello".slice(1, 4);
// "ell"

"hello world".split(" ");
// ["hello", "world"]
```

String methods do not mutate the original String.

---

## 8. Numbers & Floating-Point Precision

JavaScript uses **IEEE-754 floating-point numbers**.

This can cause precision issues:

```js
0.1 + 0.2;
// 0.30000000000000004
```

Therefore:

```js
0.1 + 0.2 === 0.3;
// false
```

`Number.EPSILON` can sometimes help with floating-point comparisons, but it is **not a universal solution**.

Useful Number methods:

```js
Number.isInteger(42);
// true

Number.isNaN(NaN);
// true

Number.isFinite(42);
// true

Number.parseInt("42px");
// 42

Number.parseFloat("42.5px");
// 42.5
```

JavaScript also has a safe integer range:

```js
Number.MIN_SAFE_INTEGER
Number.MAX_SAFE_INTEGER
```

---

## 9. Math & Bitwise Operations

JavaScript provides mathematical utilities through `Math`:

```js
Math.PI;
// 3.141592653589793

Math.abs(-32.6);
// 32.6

Math.round(-32.6);
// -33

Math.min(10, 20);
// 10
```

`Math.random()` generates a pseudo-random value:

```js
Math.random();
// 0 <= value < 1
```

It should **not** be used for cryptographic purposes.

JavaScript also supports Bitwise operators:

```js
42 & 36;
// 32

42 | 36;
// 46

42 ^ 36;
// 14

~42;
// -43

42 << 3;
// 336

42 >> 3;
// 5
```

Bitwise operations convert Numbers to **32-bit integers**.

---

