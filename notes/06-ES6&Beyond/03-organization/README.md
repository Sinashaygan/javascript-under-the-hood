# ES6 & Beyond — Organization

A concise summary of [Chapter 3](https://ydkj-doc.vercel.app/es6_&_beyond/ch3). ES6 organizes data, execution, APIs, and object behavior through iterators, generators, modules, and classes.

## 1. Iterator and Iterable Protocols

An iterator exposes `next()`, returning `{ value, done }`. An iterable exposes `[Symbol.iterator]()`, producing an iterator. These are behavioral contracts, not ES6 interface declarations.

```js
const cursor = [7, 9][Symbol.iterator]();
cursor.next(); // { value: 7, done: false }
cursor.next(); // { value: 9, done: false }
cursor.next(); // { value: undefined, done: true }
```

## 2. Consuming Iterables

`for...of`, array spread, and array destructuring consume iterables. `for...of` ignores completion values with `done: true`. Spread exhausts its input; an infinite iterable therefore needs bounded consumption.

```js
const colors = ["red", "blue"];
const [first] = colors;
const copy = [...colors];
for (const color of colors) console.log(color);
```

## 3. Custom Iterators and Cleanup

Custom iterators can preserve state in closures and organize values or tasks. Returning `this` from `[Symbol.iterator]()` makes an iterator iterable. Optional `return()` supports cleanup when consumers stop early; `throw()` signals errors.

## 4. Generator Functions

Calling `function*` creates an iterable iterator without executing its body. `next()` starts or resumes execution; `yield` pauses it. Each call creates independent execution state.

```js
function* stages() {
    yield "draft";
    yield "review";
    return "complete";
}
const workflow = stages();
workflow.next(); // { value: "draft", done: false }
```

## 5. Two-Way Communication

`yield` sends a value out; the next `next(value)` supplies its expression result. The first `next()` argument is ignored. A generator's `return` produces a completion value, not another yielded item.

```js
function* doubleInput() {
    const input = yield "number?";
    return input * 2;
}
const request = doubleInput();
request.next();  // { value: "number?", done: false }
request.next(6); // { value: 12, done: true }
```

## 6. Delegation with `yield*`

`yield*` delegates iteration to another iterable. Its expression result is the delegate's completion value, allowing generators to compose execution and results.

```js
function* inner() {
    yield "step";
    return "finished";
}
function* outer() {
    const result = yield* inner();
    yield result;
}
[...outer()]; // ["step", "finished"]
```

## 7. Early Completion and Errors

For a suspended generator, `return(value)` requests completion; `throw(error)` injects an exception at the pause. `catch` may recover and continue. `finally` runs during cleanup; yielding there can postpone completion.

```js
function* guarded() {
    try {
        yield "working";
    } finally {
        console.log("cleanup");
    }
}
for (const value of guarded()) break; // logs "cleanup"
```

## 8. Generator Uses and Transpilation

Generators simplify lazy sequences and stepwise execution. Asynchronous workflows require a runner to coordinate yielded operations. Older targets can use a transpiler that converts generator execution into a state machine.

## 9. Modules and Earlier Patterns

Closure-based factories hide state and expose an API. CommonJS uses `require()` and `module.exports`. ES6 introduces explicit module syntax, private module scope, strict mode, and statically discoverable dependencies.

## 10. Exports

Named exports expose declarations or existing bindings, optionally under aliases. A module has at most one default export. Re-exports forward another module's API; `export *` excludes its default export.

```js
// counter.js
export let count = 0;
export function increment() { count++; }
export default function reset() { count = 0; }
```

## 11. Imports

Static imports use literal specifiers at module top level. Named imports can be aliased; default imports choose a local name. Namespace imports group exports. Bare imports execute module side effects.

```js
// app.js
import reset, { count, increment as add } from "./counter.js";
import * as counter from "./counter.js";
add();
console.log(count, counter.count); // 1 1
reset();
console.log(count); // 0
```
