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
