## 1. ECMAScript and JavaScript

JavaScript is the programming language we use, while **ECMAScript** is the standardized specification that defines how the language works.

The language evolved through several versions:

```text
ES3 → ES5 → ES5.1 → ES6
```

ES6 was released in 2015 and is also known as **ES2015**.

ECMAScript defines the language features, while JavaScript engines such as V8, SpiderMonkey, and JavaScriptCore implement those features.

## 2. ES6 / ES2015

ES6 was a major evolution of JavaScript. It introduced many new language features and programming patterns.

Some important ES6 features include:

```js
let
const
arrow functions
template literals
destructuring
spread/rest
classes
modules
promises
generators
Map
Set
Symbol
Proxy
```

ES6 was therefore much more than a collection of new APIs. It introduced significant changes to JavaScript syntax and the way developers structure their programs.

## 3. JavaScript Is Continuously Evolving

JavaScript should not be viewed as a language that receives a completely new version every few years.

Instead, JavaScript continuously evolves by adding new features.

Rather than thinking only in terms of:

```text
ES6 → ES7 → ES8 → ...
```

it is more useful to think about individual language features:

```text
Feature A
Feature B
Feature C
Feature D
```

Each feature can have different levels of support across browsers and JavaScript environments.

## 4. Feature-Based Thinking

Instead of simply saying:

> "My project uses ES6."

it is better to understand exactly which JavaScript features the project uses and whether the target environment supports them.

For example:

```text
let
const
arrow functions
Promises
async/await
modules
```

Each feature should be considered independently in terms of environment support.

The important mindset is:

```text
JavaScript Version
       ↓
Individual Features
       ↓
Environment Support
```

## 5. Transpilers

A **transpiler** transforms newer JavaScript syntax into older syntax that can run in environments that do not understand the newer syntax.

For example:

```js
const add = (a, b) => a + b;
```

can be transformed into something similar to:

```js
var add = function(a, b) {
    return a + b;
};
```

The general process is:

```text
Modern JavaScript Syntax
          ↓
       Transpiler
          ↓
Older JavaScript Syntax
```

Tools such as **Babel** can perform this type of transformation.

Transpilers are mainly useful for dealing with newer language syntax.

## 6. Polyfills

A **polyfill** provides an implementation of a newer API when the current JavaScript environment does not support it.

For example:

```js
if (!Object.is) {
    Object.is = function(v1, v2) {
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }

        if (v1 !== v1) {
            return v2 !== v2;
        }

        return v1 === v2;
    };
}
```

The general pattern is:

```js
if (!feature) {
    // provide a fallback
}
```

A polyfill normally checks whether the feature already exists before providing an alternative implementation.

## 7. Transpiler vs Polyfill

The key difference between a transpiler and a polyfill is what they solve.

| Transpiler             | Polyfill                       |
| ---------------------- | ------------------------------ |
| Handles newer syntax   | Handles missing APIs           |
| Transforms source code | Provides missing functionality |
| `const`                | `Object.is()`                  |
| Arrow functions        | New Array/Object APIs          |
| Classes                | Other missing APIs             |

In short:

```text
New Syntax
    ↓
Transpiler
```

while:

```text
Missing API
    ↓
Polyfill
```

Understanding this distinction is important when working with modern JavaScript and browser compatibility.

## 8. Syntax Cannot Simply Be Polyfilled

Polyfills work at runtime, but JavaScript syntax must first be understood by the engine's parser.

For example:

```js
const x = 10;
```

If an old JavaScript engine cannot parse `const`, a runtime polyfill cannot simply teach its parser to understand it.

Therefore:

```text
New Syntax → Transpilation
New API    → Polyfill
```

This is one of the most important distinctions in JavaScript compatibility.

## 9. Shims

**Shims** and **polyfills** are closely related concepts.

They provide compatibility layers or alternative implementations that allow newer functionality to work in environments that do not natively support it.

The general idea is:

```text
New Feature
     ↓
Compatibility Layer
     ↓
Older Environment
```

The goal is to provide compatibility without requiring the environment itself to natively implement the feature.

## 10. Main Idea of the Chapter

The main lesson of this chapter is that modern JavaScript development should not be based only on version numbers.

Instead of thinking:

```text
"I use ES6."
```

think:

```text
"What JavaScript features am I using?"
"Which environments support them?"
"Do I need transpilation?"
"Do I need polyfills?"
```

Modern JavaScript development can combine:

```text
Modern JavaScript
       ↓
Transpilation
       +
Polyfills
       ↓
Compatible Environment
```

This approach allows developers to use modern JavaScript features while maintaining compatibility with environments that may not support every feature natively.
