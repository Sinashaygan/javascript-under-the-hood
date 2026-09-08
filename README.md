# JavaScript Under the Hood

My JavaScript learning notes and focused exercises while reading
You Don't Know JS Yet, with practical connections to React, Next.js,
and TypeScript.

## Goals

- Build precise mental models of JavaScript behavior.
- Deepen my understanding of scope, closures, functions, this,
  coercion, prototypes, modules, and asynchronous execution.
- Connect JavaScript fundamentals to real frontend engineering.
- Practice through focused examples, output predictions, and debugging.

## Study Approach

Each chapter or section includes:

- A concise summary written in my own words.
- Core concepts and explanations of their behavior.
- Practical connections to frontend development.
- Common mistakes and misleading assumptions.
- Small exercises with reasoning hints.
- Short quiz questions.
- Long-term takeaways.

Notes and code are written in English.
Study discussions and additional explanations are in Persian.

Exercise solutions are added after attempting and reviewing the exercises.

## Important Distinctions

Throughout these notes, I distinguish between:

- JavaScript language behavior.
- Browser and Node.js runtime behavior.
- React's rendering model.
- TypeScript's compile-time checks.

Connections between these layers are explained without treating them
as interchangeable.

## Contents

### Get Started

- [What Is JavaScript?](notes/01-get-started/01-what-is-javascript/README.md)
  — Not started

## Repository Structure
```text
javascript-under-the-hood/
├── .gitignore
├── README.md
└── notes/
└── 01-get-started/
└── 01-what-is-javascript/
├── README.md
└── exercises.js

## Running Exercises

Run Node.js-compatible exercises from the repository root:

sh
node notes/01-get-started/01-what-is-javascript/exercises.js

Exercises that require a browser, React, or a particular module format
will include their own execution instructions.

The execution environment matters. An example may behave differently
depending on strict mode, module format, or runtime.

## Source and Attribution

These are independent study notes based on You Don't Know JS Yet
by Kyle Simpson.

This repository contains my own summaries and practice code.
It is not a reproduction of the books or an official companion.
`