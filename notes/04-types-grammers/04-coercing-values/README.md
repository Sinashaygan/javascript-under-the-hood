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

# ToPrimitive()

Objects are not primitive values, so JavaScript sometimes needs to convert an object into a primitive value.

During this process, JavaScript can use:

```js
valueOf()
toString()
```

For example:

```js
const obj = {
    valueOf() {
        return 42;
    },

    toString() {
        return "hello";
    }
};

Number(obj); // 42
String(obj); // "hello"
```

The conversion process depends on the context and the expected type.

Conceptually:

```text
Object
  ↓
ToPrimitive
  ↓
Primitive value
```

If the conversion methods fail to produce a primitive value, JavaScript can throw a `TypeError`.

# Symbol.toPrimitive

Objects can customize their primitive conversion behavior using:

```js
Symbol.toPrimitive
```

Example:

```js
const obj = {
    [Symbol.toPrimitive](hint) {
        return 25;
    }
};

Number(obj); // 25
String(obj); // "25"
```

`Symbol.toPrimitive` receives a `hint` that indicates the kind of conversion being requested.

The common hints are:

```text
"number"
"string"
"default"
```

This mechanism gives an object direct control over how it is converted into a primitive value.

# Operators and Coercion

Most mathematical operators expect numbers, so JavaScript performs numeric coercion when necessary.

```js
"42" - 2; // 40
"42" * 2; // 84
"42" / 2; // 21
```

The `+` operator is special because it can perform either numeric addition or string concatenation.

```js
"42" + 2; // "422"
```

Compare:

```js
"42" - 2; // 40
"42" + 2; // "422"
```

The `-` operator converts the string into a number.

The `+` operator can instead choose string concatenation when a string is involved.

Understanding this difference is essential when working with JavaScript coercion.

# Equality: `==` vs `===`

The `===` operator performs strict equality and does not perform type coercion between different types.

```js
42 === "42"; // false
```

The `==` operator performs loose equality and can perform coercion when the compared values have different types.

```js
42 == "42"; // true
```

Conceptually:

```text
42 == "42"
     ↓
"42" → 42
     ↓
42 == 42
     ↓
true
```

An important special case is:

```js
null == undefined; // true
```

But:

```js
null == 0;         // false
undefined == 0;    // false
```

Therefore:

```js
value == null
```

can be used to check for either `null` or `undefined`.

The important lesson is that `==` follows defined coercion rules; its behavior is not random.
