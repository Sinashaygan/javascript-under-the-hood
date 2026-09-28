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
