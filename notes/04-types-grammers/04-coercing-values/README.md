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

# Boolean Contexts

JavaScript automatically performs Boolean coercion in several contexts.

Common examples include:

```text
if
while
for
&&
||
?:
```

For example:

```js
const name = "Sina";

if (name) {
    console.log("Hello");
}
```

The `if` statement needs a Boolean value, so JavaScript conceptually performs:

```js
Boolean("Sina"); // true
```

Boolean coercion can also be written explicitly:

```js
Boolean(value);
```

or with double negation:

```js
!!value;
```

For example:

```js
Boolean("hello"); // true
!!"hello";        // true
```

`!!value` works because it applies the logical NOT operator twice.

# ToString()

`ToString()` converts a value into a string.

Examples:

```js
String(42);         // "42"
String(true);       // "true"
String(false);      // "false"
String(null);       // "null"
String(undefined);  // "undefined"
```

A special case is negative zero:

```js
String(-0); // "0"
```

Symbols have special behavior:

```js
String(Symbol("ok")); // "Symbol(ok)"
```

However, implicit string coercion of a Symbol can throw an error:

```js
Symbol("ok") + "";
// TypeError
```

So explicit `String()` conversion and implicit string coercion are not always identical.

# ToNumber()

`ToNumber()` converts values into numbers.

Examples:

```js
Number("42");    // 42
Number("-3");    // -3
Number("1.23");  // 1.23
```

Invalid numeric strings produce `NaN`:

```js
Number("hello"); // NaN
Number("123px"); // NaN
```

Some important conversions:

```js
Number(true);       // 1
Number(false);      // 0
Number(null);       // 0
Number(undefined);  // NaN
Number("");         // 0
Number("   ");      // 0
```

A useful distinction is:

```text
null       → 0
undefined  → NaN
```

This difference appears frequently in JavaScript coercion behavior.
