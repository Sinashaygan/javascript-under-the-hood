## Section: Deconstructing `class` and `new`

### Core Concepts

* **`constructor()` Initialization:** A class constructor does not create the instance itself. By the time the constructor runs, the instance has already been created.

* **`new` Creates the Instance:** The `new` operator performs the creation work and establishes the new object's context.

* **Factory Function:** A regular function can create and return an object without using `class` or `new`.

```js
function Point2d(x, y) {
    var instance = {};

    instance.x = x;
    instance.y = y;

    return instance;
}

var point = Point2d(3, 4);
```

* **Prototype Linking:** The created object can be linked to another object through `[[Prototype]]`.

```js
var prototypeObj = {
    toString() {
        return `(${this.x},${this.y})`;
    }
};

var point = {
    __proto__: prototypeObj
};
```

* **Four `new` Steps:** The `new` operation can be understood as:

  1. Create a new empty object.
  2. Link it to a prototype.
  3. Invoke the constructor with the new object as `this`.
  4. Return the resulting object.

### Architectural Takeaway

The `class` and `new` syntax hides several separate operations. Understanding those underlying operations makes it possible to reconstruct similar behavior using ordinary objects, prototype links, and `this`.

### Source

*objects-classes/ch5.md, "What's A Constructor, Anyway?"*

## Section: Factory Functions

### Core Concepts

* **Factory Function:** A factory function is a regular function that creates, initializes, and returns an object.

```js
function Point2d(x, y) {
    var instance = {};

    instance.x = x;
    instance.y = y;

    return instance;
}
```

* **No `class`:** Factory functions do not require the `class` keyword.

* **No `new`:** The function can be invoked as a normal function.

```js
var point = Point2d(3, 4);
```

* **Explicit Initialization:** Properties can be assigned directly to the newly created object.

* **Prototype Delegation:** The created object can be linked to another object so that behavior can be shared through `[[Prototype]]`.

### Architectural Takeaway

Object creation does not inherently require classes or constructors. A factory function can explicitly perform creation and initialization while prototype linkage can provide shared behavior.

### Source

*objects-classes/ch5.md, "What's A Constructor, Anyway?"*
