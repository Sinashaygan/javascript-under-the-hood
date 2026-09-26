## 1. Block-Scoped Declarations

ES6 introduces `let` and `const`, which are block-scoped unlike `var`.

```js
{
    let a = 10;
    const b = 20;

    console.log(a);
    console.log(b);
}
```

Variables declared with `let` and `const` are only accessible inside their block.

```js
{
    let a = 10;
}

console.log(a); // ReferenceError
```

### `let`

`let` allows reassignment:

```js
let count = 0;

count = 1;
count++;
```

### `const`

`const` prevents reassignment of the binding:

```js
const x = 10;

x = 20; // TypeError
```

However, `const` does not make objects immutable:

```js
const user = {
    name: "Sina"
};

user.name = "Ali"; // Allowed
```

The reference cannot be reassigned, but the object's contents can still be mutated.

## 2. Temporal Dead Zone (TDZ)

`let` and `const` declarations are not accessible before their declaration is evaluated.

```js
console.log(a); // ReferenceError

let a = 10;
```

This period between entering the scope and reaching the declaration is called the **Temporal Dead Zone**.

Unlike `var`:

```js
console.log(a); // undefined

var a = 10;
```

The TDZ helps prevent accidental access to variables before they are initialized.

## 3. `let` in Loops

`let` is especially useful in loops because the variable belongs to the loop's block scope.

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i); // ReferenceError
```

This prevents the loop variable from leaking into the surrounding scope.

`let` also provides the expected behavior when closures are created inside loops because each iteration can have its own binding.

## 4. Spread and Rest

The `...` syntax has two different meanings depending on its position.

### Spread

Spread expands an iterable into individual values.

```js
const numbers = [2, 3, 4];

const result = [1, ...numbers, 5];

console.log(result);
// [1, 2, 3, 4, 5]
```

It can also be used when passing function arguments:

```js
const values = [1, 2, 3];

Math.max(...values);
```

### Rest

Rest collects multiple values into an array.

```js
function foo(...args) {
    console.log(args);
}

foo(1, 2, 3);
// [1, 2, 3]
```

The key distinction is:

```text
Spread → expands values
Rest   → collects values
```

Rest parameters must appear last:

```js
function foo(a, b, ...rest) {}
```
