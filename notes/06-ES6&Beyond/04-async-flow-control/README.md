# ES6 & Beyond — Chapter 5: Collections

## Overview

ES6 introduced several native collection and data-structure abstractions that go beyond the traditional `Array` and `Object`.

The main collections covered in this chapter are:

* `TypedArray`
* `Map`
* `WeakMap`
* `Set`
* `WeakSet`

Each one solves a different problem.

```text
TypedArray → structured binary data
Map        → key/value collections
WeakMap    → object keys with weak references
Set        → unique values
WeakSet    → unique objects with weak references
```

## 1. TypedArrays

A `TypedArray` is not simply an array restricted to one JavaScript type.

It provides structured access to **binary data** using array-like syntax.

Binary data is stored inside an `ArrayBuffer`.

```js
const buf = new ArrayBuffer(32);

console.log(buf.byteLength);
// 32
```

The `ArrayBuffer` represents a raw block of memory. To access that memory, we create a view such as a TypedArray.

```js
const buf = new ArrayBuffer(32);

const arr = new Uint16Array(buf);

console.log(arr.length);
// 16
```

Because:

```text
32 bytes = 256 bits
```

and every `Uint16` element uses:

```text
16 bits
```

we get:

```text
256 / 16 = 16 elements
```

### Common TypedArray Types

```text
Int8Array
Uint8Array
Uint8ClampedArray

Int16Array
Uint16Array

Int32Array
Uint32Array

Float32Array
Float64Array
```

`Uint8ClampedArray` clamps values to the `0–255` range.
