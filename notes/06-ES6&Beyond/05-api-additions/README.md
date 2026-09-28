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
