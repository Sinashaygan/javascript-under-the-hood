# Chapter 3: Digging to the Roots of JS

**Source:** `get-started/ch3.md`

**Status:** Completed

## Chapter Summary

This chapter explores several foundational JavaScript mechanisms that are
easy to use but require deeper understanding to explain correctly.

The main topics are iteration, closures, the `this` keyword, prototypes,
delegation, and the importance of asking "why?" when investigating code
behavior.

The chapter's broader goal is to move beyond surface-level syntax and build
a stronger mental model of JavaScript runtime behavior.
## Core Concepts

- **Iteration:** A protocol for processing values step by step through
  iterators and the `next()` method.

- **Iterator:** An object that produces a sequence of values, usually through
  repeated calls to `next()`.

- **Iterable:** A value that can provide an iterator and can therefore be
  consumed by constructs such as `for..of` and the spread operator.

- **Closure:** A function's ability to retain access to variables from its
  surrounding lexical scope, even when the function is executed elsewhere.

- **`this` Keyword:** A dynamically determined execution context whose value
  depends on the call-site rather than on the function's definition site.

- **Prototypes:** Object-to-object delegation links used for property and
  method lookup.

- **Prototype Chain:** The sequence of objects JavaScript searches when a
  property is not found directly on the current object.

- **Shadowing:** Defining a property on an object that has the same name as a
  property found higher in its prototype chain.

- **Delegation:** Reusing behavior through linked objects instead of treating
  prototypes as simple copies of properties.

- **Asking "Why?":** The practice of investigating the mechanisms behind
  JavaScript behavior instead of only memorizing syntax or outputs.
## Why This Matters in Real Frontend Work

A strong understanding of these mechanisms makes frontend code easier to
debug and reason about.

Closures are fundamental to callbacks, event handlers, factory functions, and
many patterns used in React and other frontend frameworks. Iterables provide
standard ways to work with arrays, strings, maps, sets, and custom data streams.

Understanding `this` helps explain method calls, explicit context injection,
and behavior in older JavaScript APIs.

Prototype knowledge is useful when inspecting objects, understanding property
lookup, debugging library code, and distinguishing delegation from copying.

TypeScript adds static type information, but it does not replace JavaScript's
runtime rules for closures, `this`, iteration, or prototypes.

The chapter's main practical lesson is to investigate runtime behavior instead
of relying only on syntax, framework conventions, or assumptions from other
programming languages.
