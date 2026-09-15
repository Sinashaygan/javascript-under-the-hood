## Section: Classy Objects (Intro)

- **Definition:** Class-orientation is a design pattern for defining "types of things" (classes) that include data (members) and behaviors (methods), and creating concrete instances of them.
- **Inheritance:** Allows classes to derive from other classes, sharing and redefining behaviors.
- **History:**
  - **Pre-ES6:** Developers mimicked classes using functions, objects, and the `[[Prototype]]` mechanism ("prototypal classes").
  - **ES6+:** Introduced `class` and `extends` keywords. Initially "syntactic sugar," but has since matured into a robust feature set.
- **Under the Hood:** Despite the syntax, JS still uses the `[[Prototype]]` mechanism. `class` is not a separate pillar of the language, but a decorative "Capital" on top of the prototype pillar.

## Section: When Should I Class-Orient My Code?

- **Theoretical Perspective:** A way to divide a business domain into "is-a" classifications (e.g., "X is a Y"). It allows defining relationships between entities (e.g., `Electronic` inherits from `Electrical`).
- **Pragmatic Perspective:** Use classes if your program needs to hold and use **multiple collections (instances)** of alike data/behavior at once.
- **Example (Timesheet):** A system with `Timesheet`, `Week`, `Day`, and `Task` entities.
  - **Encapsulation:** Each entity controls its internal details while exposing an interface.
  - **Inheritance:** A base class defines operations like `totalTime()`, and subclasses inherit this capability.
  - **Composition:** Entities are defined as collections of other entities.
- **Single vs. Multiple:** If you only ever need one concrete "thing" (e.g., just one `Computer`), class-orientation may not be the most efficient pattern. If you need multiple instances and inheritance, `class` is a good candidate.

## Section: Keep It `class`y

- **Syntax:** `class` defines a declaration or expression.
  - **Declaration:** `class Point2d { .. }`
  - **Expression:** `const pointClass = class Point2d { .. };` (Named or Anonymous)
- **Body:** Contains method definitions without the `function` keyword or separators (`,` or `;`).
- **Strict Mode:** All code inside a `class` block runs in strict-mode by default.
- **The Constructor:**
  - A special method invoked when `new` is used.
  - If omitted, a default empty constructor is assumed.
  - It is a special function type; it **cannot** be invoked without `new` (throws `TypeError`).
  - **Instances:** Each instance (`one`, `two`, `three`) is an independent object with a `[[Prototype]]` linkage to `Point2d.prototype`.

  # Section: Class Methods / Class Instance `this` / Public Fields

- **Class Methods:**
  - Methods are added to the `prototype` object, not the instance itself.
  - `point.setX(..)` traverses the `[[Prototype]]` chain to find the method.
  - Methods should be invoked via instances, not directly on the constructor.
- **`this` Keyword:**
  - Refers to the current instance context during method invocation.
  - Used in the constructor to add properties (`this.x = x`).
  - **Members:** Properties holding non-function values.
- **Public Fields:**
  - Declarative syntax directly in the `class` body (e.g., `x = 0`).
  - Can reference each other via `this.`.
  - Can be computed (e.g., `[coordName.toUpperCase()] = 42`).
- **Avoid This (Anti-Pattern):**
  - **Bad Practice:** Defining methods as arrow functions in the constructor or as fields (e.g., `getDoubleX = () => this.x * 2`).
  - **Why:** It creates a new function property for **each instance** rather than sharing it on the prototype. This wastes memory and invalidates the power of dynamic `this`.
  - **Solution:** If you need static context binding, use **closure**, not classes.

## Section: Class Extension

- **`extends` Keyword:** Defines inheritance (e.g., `class Point3d extends Point2d`).
- **Behavior:** The subclass (`Point3d`) inherits fields and methods from the base (`Point2d`).
- **Overriding:**
    - **Fields:** Subclass can re-initialize inherited fields (e.g., `x = 21`).
    - **Methods:** Subclass can redefine a method with the same name.
- **`super` Keyword:**
    - Used to access inherited methods even if overridden (e.g., `super.getX()`).
    - **Polymorphism:** The ability for methods of the same name to exhibit different behavior based on the level of the hierarchy.