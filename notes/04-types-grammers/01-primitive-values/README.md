## Section: Deconstructing `class` and `new`

### Core Concepts

* **Constructor vs Creation:** A `constructor()` does not create the instance. It initializes an object that has already been created.

* **`new` Creates the Instance:** The `new` operator is responsible for creating the new object, linking its prototype, assigning `this`, invoking the constructor, and returning the resulting object.

* **Factory Function:** The same basic behavior can be implemented with a regular function that explicitly creates, initializes, and returns an object.

```js
function Point2d(x, y) {
    var instance = {};

    instance.x = x;
    instance.y = y;

    return instance;
}
```

* **Prototype Linking:** The created object can be connected to another object through its `[[Prototype]]`.

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

* **Four Conceptual Steps of `new`:**

  1. Create a new empty object.
  2. Link the object's `[[Prototype]]`.
  3. Invoke the constructor with the new object as `this`.
  4. Return the resulting object.

### Architectural Takeaway

The `class` and `new` syntax hides several lower-level object operations. Understanding those operations makes JavaScript's prototypal object model much easier to reason about.

### Source

*objects-classes/ch5.md, "What's A Constructor, Anyway?"*
