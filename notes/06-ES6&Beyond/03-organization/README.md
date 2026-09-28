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

## 12. Live Bindings and Cycles

Imports are live, read-only bindings: exporter updates remain visible, but importers cannot reassign them. Exported objects may still be mutable. Cyclic dependencies are supported, although reading an uninitialized binding can fail.

`export default count` captures an expression value; `export { count as default }` exposes the live variable binding.

## 13. Module Loading

Hosts resolve specifiers and load dependencies; static syntax describes the dependency graph. Within a module graph, consumers share an evaluated module instance. The chapter's `Reflect.Loader` discussion describes historical proposals, not a standardized ES6 API.

## 14. Class Syntax

Classes organize constructors and shared prototype methods. They retain JavaScript's prototype delegation model. Class bodies use strict mode; constructors require `new`, and class declarations cannot be accessed before initialization.

```js
class Label {
    constructor(text) { this.text = text; }
    describe() { return this.text; }
}
new Label("ready").describe(); // "ready"
```

## 15. Inheritance and `super`

`extends` links both instance prototypes and constructors. `super.method()` starts lookup from the method's home object's prototype while retaining the current `this`. Copying a method does not change that home object.

```js
class HighlightedLabel extends Label {
    describe() { return `[${super.describe()}]`; }
}
new HighlightedLabel("ready").describe(); // "[ready]"
```

## 16. Derived Constructors and `new.target`

A derived constructor must call `super()` before accessing `this`. Its default constructor forwards arguments. `new.target` identifies the constructor invoked by `new`, including through parent constructor calls.

```js
class TaggedLabel extends Label {
    constructor(text, tag) {
        super(text);
        this.tag = tag;
        this.createdBy = new.target.name;
    }
}
new TaggedLabel("ready", "status").createdBy; // "TaggedLabel"
```

## 17. Native Subclasses and `Symbol.species`

ES6 supports subclassing built-ins such as `Array` and `Error`. A static `Symbol.species` getter selects the constructor used by species-aware methods such as `Array.prototype.map()`.

```js
class Scores extends Array {
    static get [Symbol.species]() { return Array; }
    first() { return this[0]; }
}
const scores = new Scores(4, 8);
const doubled = scores.map(value => value * 2);
doubled instanceof Scores; // false
doubled instanceof Array;  // true
```

## 18. Static Methods and Review

Static methods belong to constructors, are inherited by subclasses, and are unavailable directly on instances.

```js
class LabelFactory extends Label {
    static create(text) { return new this(text); }
}
LabelFactory.create("ready").describe(); // "ready"
```

- Iterators standardize sequential consumption.
- Generators preserve execution between steps.
- Modules define boundaries and dependencies.
- Classes organize behavior through prototype delegation.

### References

- [Chapter 3: Organization](https://ydkj-doc.vercel.app/es6_&_beyond/ch3)
- [ECMAScript: iteration and generators](https://tc39.es/ecma262/multipage/control-abstraction-objects.html)
- [ECMAScript: scripts and modules](https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html)
- [ECMAScript: functions and classes](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html)
