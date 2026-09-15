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