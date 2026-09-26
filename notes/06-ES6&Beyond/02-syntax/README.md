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
