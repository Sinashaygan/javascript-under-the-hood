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

# Abstract Operations

JavaScript's specification defines several internal operations that describe how values are converted between types.

The most important ones are:

```text
ToBoolean()
ToString()
ToNumber()
ToPrimitive()
```

These are **specification-level operations**, not normal JavaScript functions that we can directly call.

For example:

```js
Number("42"); // 42
```

Conceptually, JavaScript performs a `ToNumber` operation to convert `"42"` into `42`.

These abstract operations help explain what JavaScript is doing internally during coercion.

# ToBoolean()

`ToBoolean()` converts a value into either `true` or `false`.

The main **falsy** values are:

```js
undefined
null
false
+0
-0
NaN
""
0n
```

Everything else is generally **truthy**.

For example:

```js
Boolean("");    // false
Boolean(0);     // false
Boolean(null);  // false
Boolean(NaN);   // false
```

But empty arrays and objects are truthy:

```js
Boolean([]); // true
Boolean({}); // true
```

This is an important JavaScript rule:

```text
[]  → truthy
{}  → truthy
```

They are objects, and objects are truthy regardless of whether they contain any properties or elements.
