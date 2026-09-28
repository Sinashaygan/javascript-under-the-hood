## Array.of()

`Array.of()` creates an Array from its arguments without the special behavior of `Array()` when given a single numeric argument.

```js
Array(3);
// [empty × 3]

Array.of(3);
// [3]

Array.of(1, 2, 3);
// [1, 2, 3]
```

### Key Point

```js
Array(3);    // Creates an Array with length 3
Array.of(3); // Creates an Array containing 3
```

## Array.from()

`Array.from()` creates a real Array from an iterable or array-like value.

```js
const arrLike = {
    length: 3,
    0: "foo",
    1: "bar"
};

Array.from(arrLike);
// ["foo", "bar", undefined]
```

It can also perform mapping during conversion:

```js
Array.from([1, 2, 3], function mapper(value) {
    return value * 2;
});

// [2, 4, 6]
```

`Array.from()` is useful for converting array-like objects and iterables into real Arrays.

## Empty Slots

`Array.from()` produces actual values instead of empty slots.

```js
Array(3);
// [empty × 3]

Array.from({ length: 3 });
// [undefined, undefined, undefined]
```

Empty slots can behave differently from explicit `undefined` values, so `Array.from()` can be useful when a real value is needed at every index.

## copyWithin()

`copyWithin()` copies part of an Array into another position within the same Array.

```js
const arr = [1, 2, 3, 4, 5];

arr.copyWithin(3, 0);

console.log(arr);
// [1, 2, 3, 1, 2]
```

Syntax:

```js
array.copyWithin(target, start, end);
```

`start` is included and `end` is excluded.

`copyWithin()` modifies the original Array.

## fill()

`fill()` replaces Array elements with a specified value.

```js
const arr = [1, 2, 3, 4];

arr.fill(0, 1, 3);

console.log(arr);
// [1, 0, 0, 4]
```

Syntax:

```js
array.fill(value, start, end);
```

`start` is included and `end` is excluded.

## find() and findIndex()

`find()` searches an Array using a callback and returns the first matching value.

```js
const numbers = [1, 2, 3, 4, 5];

numbers.find(function(value) {
    return value > 3;
});
// 4
```

If no value matches, `find()` returns `undefined`.

`findIndex()` returns the index of the first matching element.

```js
const numbers = [10, 20, 30, 40];

numbers.findIndex(function(value) {
    return value > 25;
});
// 2
```

If nothing matches, `findIndex()` returns `-1`.

### Comparison

```text
some()       → true / false
find()       → matching value
findIndex()  → matching index
```

## Array Iterators

ES6 provides several Array iterator methods:

```js
const arr = [10, 20, 30];

[...arr.keys()];
// [0, 1, 2]

[...arr.values()];
// [10, 20, 30]

[...arr.entries()];
// [[0, 10], [1, 20], [2, 30]]
```

The default Array iterator is the `values()` iterator:

```js
arr[Symbol.iterator]();
```

These methods connect Arrays directly with the ES6 Iterator protocol.

## Object.is()

`Object.is()` performs a precise value comparison.

Two important differences from `===` are:

```js
NaN === NaN;
// false

Object.is(NaN, NaN);
// true
```

And:

```js
0 === -0;
// true

Object.is(0, -0);
// false
```

For most other values, `Object.is()` behaves similarly to `===`.

## Object.getOwnPropertySymbols()

`Object.getOwnPropertySymbols()` returns the Symbol properties directly defined on an object.

```js
const sym = Symbol("foo");

const obj = {
    name: "Sina",
    [sym]: 42
};

Object.getOwnPropertySymbols(obj);
// [Symbol(foo)]
```

Only own Symbol properties are returned.

## Object.setPrototypeOf()

`Object.setPrototypeOf()` changes the prototype of an existing object.

```js
const parent = {
    hello() {
        console.log("Hello");
    }
};

const child = {};

Object.setPrototypeOf(child, parent);

child.hello();
// Hello
```

Property lookup can continue through the prototype chain.

Changing prototypes after objects are already heavily used can have performance implications, so this API should be used carefully.

## Object.assign()

`Object.assign()` copies own enumerable properties from one or more source objects into a target object.

```js
const target = {};

Object.assign(
    target,
    { name: "Sina" },
    { age: 20 }
);

console.log(target);
// { name: "Sina", age: 20 }
```

If multiple sources contain the same property, later sources overwrite earlier ones.

```js
Object.assign(
    {},
    { name: "Sina" },
    { name: "Ali" }
);

// { name: "Ali" }
```

`Object.assign()` copies:

```text
Own properties
+
Enumerable properties
```

It does not copy inherited or non-enumerable properties.

## Math API Additions

ES6 added several mathematical utilities.

### Trigonometric

```js
Math.cosh()
Math.acosh()
Math.sinh()
Math.asinh()
Math.tanh()
Math.atanh()
Math.hypot()
```

Example:

```js
Math.hypot(3, 4);
// 5
```

### Arithmetic

```js
Math.cbrt()
Math.clz32()
Math.expm1()
Math.log2()
Math.log10()
Math.log1p()
Math.imul()
```

Examples:

```js
Math.cbrt(8);
// 2

Math.log2(8);
// 3
```

### Other Useful Methods

```js
Math.sign()
Math.trunc()
Math.fround()
```

`Math.sign()` returns the sign of a number.

```js
Math.sign(10);
// 1

Math.sign(-10);
// -1
```

`Math.trunc()` removes the fractional part without rounding.

```js
Math.trunc(4.9);
// 4

Math.trunc(-4.9);
// -4
```

`Math.fround()` converts a number to the nearest 32-bit floating-point representation.

## Number API Additions

ES6 added several useful Number properties and methods.

### Number.EPSILON

`Number.EPSILON` represents the smallest difference between `1` and the next representable floating-point number.

It is useful when dealing with floating-point precision.

```js
0.1 + 0.2 === 0.3;
// false
```

### Safe Integers

```js
Number.MAX_SAFE_INTEGER;
// 9007199254740991

Number.MIN_SAFE_INTEGER;
// -9007199254740991
```

These represent the safe integer range:

```text
-(2^53 - 1) → 2^53 - 1
```

## Number.isNaN()

`Number.isNaN()` checks whether a value is actually `NaN` without performing type coercion.

```js
Number.isNaN(NaN);
// true

Number.isNaN("NaN");
// false

Number.isNaN(42);
// false
```

Unlike the global `isNaN()`:

```js
isNaN("hello");
// true

Number.isNaN("hello");
// false
```

### Number.isFinite()

`Number.isFinite()` checks whether a value is a finite Number without coercion.

```js
Number.isFinite(42);
// true

Number.isFinite(Infinity);
// false

Number.isFinite(NaN);
// false

Number.isFinite("42");
// false
```

### Key Difference

```text
isNaN() / isFinite()
→ perform coercion

Number.isNaN() / Number.isFinite()
→ do not perform coercion
```

## Number.isInteger()

Checks whether a value is an integer.

```js
Number.isInteger(10);
// true

Number.isInteger(10.5);
// false

Number.isInteger(NaN);
// false

Number.isInteger(Infinity);
// false
```

### Number.isSafeInteger()

Checks whether a value is both an integer and within the safe integer range.

```js
Number.isSafeInteger(42);
// true

Number.isSafeInteger(Math.pow(2, 53));
// false
```

## Unicode APIs

ES6 improved Unicode support with:

```js
String.fromCodePoint()
String.prototype.codePointAt()
String.prototype.normalize()
```

### fromCodePoint()

Creates a String from a Unicode code point.

```js
String.fromCodePoint(0x1D49E);
```

### codePointAt()

Returns the Unicode code point at a specific position.

```js
"𝒞".codePointAt(0);
// 119966
```

### normalize()

Normalizes Unicode strings into a standard representation.

Common normalization forms include:

```text
NFC
NFD
NFKC
NFKD
```

## String.raw()

`String.raw()` provides access to the raw contents of a template literal.

```js
String.raw`\n`;
```

Unlike:

```js
"\n";
```

the escape sequence remains raw rather than being interpreted as a newline.

`String.raw()` is especially useful with tagged template literals.
