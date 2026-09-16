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

## Section: `Object.create()` and Factory Initialization

### Core Concepts

* **`Object.create()`:** Creates a new object and links its `[[Prototype]]` to the specified object.

```js
var Point2d = {
    init(x, y) {
        this.x = x;
        this.y = y;
    },

    toString() {
        return `(${this.x},${this.y})`;
    }
};

var point = Object.create(Point2d);

point.init(3, 4);
```

* **Prototype Delegation:** `point.init()` is not defined directly on `point`. The lookup delegates to `Point2d`.

* **Implicit `this`:** Because the call is `point.init()`, the `this` context inside `init()` is `point`.

* **Separated Operations:** Object creation and initialization are separated into two operations.

* **Factory Helper:** A reusable helper can combine those operations.

```js
function make(objType, ...args) {
    var instance = Object.create(objType);
    instance.init(...args);
    return instance;
}
```

### Architectural Takeaway

`Object.create()` exposes the object-creation and prototype-linking mechanisms more directly than `class` syntax. Initialization can then be delegated through a method such as `init()`.

### Source

*objects-classes/ch5.md, "Factory Initialization" & "Help Me Reconstruct!"*

## Section: Ditching Class Thinking

### Core Concepts

* **Class Hierarchy:** Class-oriented design organizes behavior into parent and child relationships.

* **Classification:** A base class represents generalized behavior, while subclasses represent specialized forms.

* **Vertical Composition:** Behavior is composed through layers of an inheritance hierarchy.

* **Mixins:** Some designs attempt to flatten inheritance hierarchies through horizontal composition.

* **Delegation Alternative:** Delegation moves away from class hierarchy thinking and instead focuses on independent objects cooperating with each other.

* **Peer Objects:** Delegation treats participating objects as peers rather than parent and child classes.

### Architectural Takeaway

The goal of delegation is not merely replacing `class` syntax. It changes the way the program is structured: instead of organizing behavior into an inheritance hierarchy, behavior is divided among independent objects that cooperate at runtime.

### Source

*objects-classes/ch5.md, "Ditching Class Thinking"*

## Section: Delegation

### Core Concepts

* **Delegation:** Delegation is about multiple objects sharing the effort of completing a task.

* **Peer Objects:** Objects are organized as independent peers rather than parent and child classes.

* **Explicit Delegation:** A function can be invoked with another object as its `this` context using `call()`.

```js
Coordinates.setXY.call(point, 3, 4);

Inspect.toString.call(point);
```

* **Implicit Delegation:** An object can delegate property lookup through its `[[Prototype]]` chain.

```js
var anotherPoint = Object.create(Coordinates);

anotherPoint.setXY(5, 6);
```

* **Shared `this`:** Delegated methods can operate on the receiving object because the `this` context remains the object from which the method was invoked.

* **Runtime Composition:** Multiple independent objects can cooperate during execution without being merged into a single class hierarchy.

### Architectural Takeaway

Delegation composes behavior at runtime rather than through inheritance. Objects can share functionality by delegating method lookup and sharing `this` context during function invocation.

### Source

*objects-classes/ch5.md, "Delegation Illustrated"*

## Section: Virtual Composition

### Core Concepts

* **Virtual Composition:** Independent objects can behave together as if their functionality were composed into a single object.

* **`this` Context Sharing:** Delegated functions continue operating against the original receiving object through `this`.

* **Dynamic Cooperation:** Objects can invoke methods belonging to other objects while preserving the current `this` context.

* **Flexible Behavior:** A method such as:

```js
this.draw();
```

does not hard-code a specific object implementation. The method resolved through `this` can vary depending on the receiving object.

* **Peer Collaboration:** `Canvas`, `Coordinates`, and `ControlPoint` can each contain separate behavior while cooperating during runtime.

### Architectural Takeaway

Virtual composition allows behavior to be assembled dynamically through `this` and `[[Prototype]]`. Instead of permanently composing behaviors into an inheritance hierarchy, the program can combine them when functions are invoked.

### Source

*objects-classes/ch5.md, "Composing Peer Objects"*
