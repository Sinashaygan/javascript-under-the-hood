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
