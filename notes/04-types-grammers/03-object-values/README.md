# Chapter 3: Object Values

JavaScript has two broad categories of values:

* **Primitive values**
* **Object values**

Objects can contain multiple properties, and each property can hold almost any kind of value.

```js
const user = {
    name: "Sina",
    age: 22,
    isStudent: true
};
```

An object can contain primitives, other objects, arrays, and functions.

## Plain Objects

A plain object is a normal JavaScript object used to store related values as properties.

```js
const user = {
    name: "Sina",
    age: 22
};
```

Properties can also be added later:

```js
user.city = "Baku";
```

A plain object can also be created with `new Object()`, but object literals are generally preferred:

```js
const user = {};
```

## Prototypes

Objects can access properties and methods through their prototype chain.

Most ordinary objects are connected to:

```js
Object.prototype
```

For example:

```js
const user = {
    name: "Sina"
};

user.toString();
```

We did not define `toString()` ourselves. It is available through the object's prototype chain.

Common methods include:

```js
toString()
valueOf()
isPrototypeOf()
hasOwnProperty()
```

Modern JavaScript also provides:

```js
Object.hasOwn(user, "name");
```

## Fundamental Objects

JavaScript provides wrapper objects for several primitive types:

```js
String
Number
Boolean
Symbol
BigInt
```

For example:

```js
const name = "Sina";

typeof name;
// "string"
```

But:

```js
const name = new String("Sina");

typeof name;
// "object"
```

`new String()`, `new Number()`, and `new Boolean()` create objects rather than primitive values, so primitive values are generally preferred.

## Auto-Boxing

Primitive values can temporarily behave like objects when we access their properties or methods.

```js
const name = "Sina";

name.toUpperCase();
// "SINA"

name.length;
// 4
```

Conceptually, JavaScript temporarily wraps the primitive:

```js
const temp = new String("Sina");

temp.toUpperCase();
```

This temporary wrapper allows primitives to access methods from their prototypes.

```text
"Sina"
   ↓
Temporary String object
   ↓
String.prototype
   ↓
toUpperCase()
```

The original value is still a primitive:

```js
typeof name;
// "string"
```

## Built-in Objects

JavaScript provides many built-in object types for specialized tasks.

Examples include:

```js
const date = new Date();

const error = new Error("Something went wrong");

const users = new Map();

const numbers = new Set();
```

Other built-in objects include:

```text
WeakMap
WeakSet
ArrayBuffer
SharedArrayBuffer
Typed Arrays
```

These objects provide specialized behavior beyond ordinary objects.

## Arrays

Arrays are also objects, but they are specialized for ordered collections of values.

```js
const numbers = [3, 12, 42];

numbers[0];
// 3

numbers[2];
// 42
```

Arrays inherit behavior from:

```js
Array.prototype
```

For example:

```js
numbers.map(v => v * 2);
// [6, 24, 84]

numbers.includes(42);
// true
```

## Array Methods

Array methods can be grouped by how they affect the array.

### Mutating methods

These modify the original array:

```js
const numbers = [1, 2, 3];

numbers.push(4);

console.log(numbers);
// [1, 2, 3, 4]
```

Examples:

```text
push()
pop()
sort()
```

### Non-mutating methods

These can create a new array:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(v => v * 2);

console.log(doubled);
// [2, 4, 6]

console.log(numbers);
// [1, 2, 3]
```

Examples:

```text
map()
slice()
concat()
```

Some methods simply return information:

```js
numbers.includes(2);
// true

numbers.indexOf(3);
// 2
```

## Functions as Objects

Functions are objects too.

```js
function hello() {
    console.log("Hello");
}
```

Because functions are objects, they can have properties and participate in the prototype system.

The chapter mentions functions and regular expressions, while leaving their detailed discussion for later parts of the book.
