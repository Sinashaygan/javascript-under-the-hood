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
