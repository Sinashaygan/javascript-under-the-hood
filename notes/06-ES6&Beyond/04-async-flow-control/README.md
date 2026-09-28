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

## 2. Endianness

When working with binary data, byte order matters.

The two common formats are:

```text
Big Endian
Little Endian
```

For example, the 16-bit value `3085` is:

```text
0c0d
```

In Big Endian:

```text
0c 0d
```

In Little Endian:

```text
0d 0c
```

JavaScript provides `DataView` for more precise control over binary data and endianness.

```js
const buffer = new ArrayBuffer(2);

const view = new DataView(buffer);

view.setInt16(0, 256, true);
```

The third argument controls the desired endian format.

## 3. Multiple Views

A single `ArrayBuffer` can have multiple views.

```js
const buf = new ArrayBuffer(2);

const view8 = new Uint8Array(buf);
const view16 = new Uint16Array(buf);

view16[0] = 3085;

console.log(view8[0]);
console.log(view8[1]);
```

Both views operate on the **same underlying buffer**.

```text
             ArrayBuffer
                  │
          ┌───────┴───────┐
          ↓               ↓
      Uint8Array      Uint16Array
```

TypedArray constructors can also receive:

```js
new Uint8Array(buffer, byteOffset, length);
```

This allows a view to start at a specific byte offset and cover only part of the buffer.

## 4. TypedArray Constructors

TypedArrays support several construction forms.

### Create from length

```js
const a = new Uint8Array(4);
```

### Create from another TypedArray

```js
const a = new Uint8Array([10, 20, 30]);

const b = new Uint8Array(a);
```

The contents are copied into a new buffer.

### Create from an array

```js
const a = new Uint8Array([10, 20, 30]);
```

TypedArrays have fixed length and their values are constrained by their declared representation.

They share many methods with regular arrays:

```js
a.map(...);
a.join(...);
```

However, methods that change the length such as:

```text
push()
pop()
splice()
```

are not generally applicable.

## 5. TypedArray Overflow

TypedArray values are constrained by their bit size.

```js
const a = new Uint8Array(3);

a[0] = 10;
a[1] = 20;
a[2] = 30;

const b = a.map(v => v * v);

console.log(b);
// [100, 144, 132]
```

The expected values are:

```text
100
400
900
```

But `Uint8Array` can only represent values in the `0–255` range, so `400` and `900` overflow.

To avoid this, use a larger TypedArray:

```js
const a = new Uint8Array([10, 20, 30]);

const b = Uint16Array.from(a, v => v * v);

console.log(b);
// [100, 400, 900]
```

## 6. TypedArray Sorting

Regular arrays perform string-based sorting by default:

```js
const a = [10, 1, 2];

a.sort();

console.log(a);
// [1, 10, 2]
```

TypedArrays use numeric sorting by default:

```js
const b = new Uint8Array([10, 1, 2]);

b.sort();

console.log(b);
// [1, 2, 10]
```

## 7. Map

A `Map` stores key/value pairs.

Unlike regular objects, a Map can use **any value as a key**, including objects.

With an ordinary object:

```js
const m = {};

const x = { id: 1 };
const y = { id: 2 };

m[x] = "foo";
m[y] = "bar";

console.log(m[x]);
// "bar"
```

Both objects become the same string property key:

```text
"[object Object]"
```

`Map` solves this problem:

```js
const m = new Map();

const x = { id: 1 };
const y = { id: 2 };

m.set(x, "foo");
m.set(y, "bar");

console.log(m.get(x));
// "foo"

console.log(m.get(y));
// "bar"
```

## 8. Map API

The main Map methods and properties are:

```js
map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
map.clear();

map.size;
```

Example:

```js
const users = new Map();

users.set("Sina", 20);
users.set("Ali", 25);

console.log(users.get("Sina"));
// 20

console.log(users.has("Ali"));
// true

console.log(users.size);
// 2
```

A Map can also be created from an iterable containing key/value pairs:

```js
const x = { id: 1 };
const y = { id: 2 };

const m = new Map([
    [x, "foo"],
    [y, "bar"]
]);
```

Maps provide three important iterator methods:

```js
map.keys();
map.values();
map.entries();
```

### Values

```js
const values = [...m.values()];
```

### Keys

```js
const keys = [...m.keys()];
```

### Entries

```js
const entries = [...m.entries()];
```

The default Map iterator is `entries()`.

Therefore:

```js
[...m]
```

is equivalent to:

```js
[...m.entries()]
```

Maps work naturally with:

```text
for...of
spread syntax
Array.from()
```

## 9. WeakMap

`WeakMap` is similar to `Map`, but its keys are held **weakly**.

A WeakMap only accepts objects as keys:

```js
const wm = new WeakMap();

const user = {
    name: "Sina"
};

wm.set(user, "metadata");

console.log(wm.get(user));
// "metadata"
```

Unlike a normal Map, the key does not prevent the object from being garbage collected.

```text
Object
   ↓
WeakMap
   ↓
weak reference
   ↓
GC can reclaim the object
```

If the object has no other references, it can become eligible for garbage collection.

### WeakMap API

```js
wm.set(key, value);
wm.get(key);
wm.has(key);
wm.delete(key);
```

WeakMap does not provide:

```text
size
clear()
keys()
values()
entries()
```

It is also not iterable.

The restricted API prevents garbage-collection behavior from becoming observable through enumeration.

### Use Case

WeakMap is useful for associating metadata with objects:

```js
const metadata = new WeakMap();

const button = document.querySelector("button");

metadata.set(button, {
    clicked: true
});
```

If the DOM element is later discarded and no other references exist, the WeakMap does not prevent it from being garbage collected.
