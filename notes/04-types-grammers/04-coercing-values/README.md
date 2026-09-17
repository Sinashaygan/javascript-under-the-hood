# What Is Coercion?

**Coercion** is the conversion of a value from one type to another.

JavaScript supports both explicit and implicit coercion.

### Explicit Coercion

We explicitly ask JavaScript to convert a value:

```js
Number("42"); // 42
```

Here, the string `"42"` is explicitly converted into a number.

### Implicit Coercion

JavaScript can also perform coercion automatically when an operation requires another type:

```js
"42" * 2; // 84
```

The string `"42"` is implicitly converted into the number `42`.

So, coercion can be thought of as:

```text
Value
  ↓
Type Conversion
  ↓
New Type
```

Understanding when and why JavaScript performs these conversions is essential for understanding its behavior.
