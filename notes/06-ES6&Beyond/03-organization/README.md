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
