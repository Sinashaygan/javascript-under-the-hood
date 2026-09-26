# You Don't Know JS Yet: ES6 & Beyond

## Foreword

The **ES6 & Beyond** book focuses on the evolution of JavaScript starting with **ES6 (ECMAScript 2015)** and continuing into newer versions of the language.

The goal is not simply to learn new syntax, but to understand the deeper behavior and concepts behind modern JavaScript.

---

## 1. ES6 Is More Than New Syntax

ES6 introduced many new features such as:

```js
let
const
class
=> // Arrow Functions
```

However, learning how to write the syntax is only the beginning.

We should also understand the **semantics** behind these features:

```text
Syntax    → How we write code
Semantics → How the code behaves
```

For example, `const` does not make an object immutable. It makes the variable binding itself non-reassignable:

```js
const user = {
    name: "Sina"
};

user.name = "Ali"; // Allowed
```

---
