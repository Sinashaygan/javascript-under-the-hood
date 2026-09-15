## Section: Classy Objects (Intro)

- **Definition:** Class-orientation is a design pattern for defining "types of things" (classes) that include data (members) and behaviors (methods), and creating concrete instances of them.
- **Inheritance:** Allows classes to derive from other classes, sharing and redefining behaviors.
- **History:**
    - **Pre-ES6:** Developers mimicked classes using functions, objects, and the `[[Prototype]]` mechanism ("prototypal classes").
    - **ES6+:** Introduced `class` and `extends` keywords. Initially "syntactic sugar," but has since matured into a robust feature set.
- **Under the Hood:** Despite the syntax, JS still uses the `[[Prototype]]` mechanism. `class` is not a separate pillar of the language, but a decorative "Capital" on top of the prototype pillar.