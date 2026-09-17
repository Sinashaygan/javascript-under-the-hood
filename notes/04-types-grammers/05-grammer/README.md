# Grammar

JavaScript grammar defines how syntax, operators, keywords, and other language constructs fit together to form valid programs.

Grammar is closely related to syntax, but it focuses more on the rules and relationships between different parts of the language.

Understanding grammar helps explain why JavaScript interprets certain code in specific ways.

## Statements & Expressions

A **statement** is like a complete sentence, while an **expression** is like a phrase.

Every expression evaluates to a value.

```js
var a = 3 * 6;
var b = a;
b;
```

Here, `3 * 6`, `a`, and `b` are expressions.

Statements can contain expressions:

```js
var a = 3 * 6;
```

The entire line is a statement, while `3 * 6` is an expression.

An expression can also be a statement by itself:

```js
b;
```

This is called an **expression statement**.

## Statement Completion Values

JavaScript statements have a **completion value**.

Browser consoles often display the completion value of the last executed statement.

For example:

```js
var a = 42;
```

The `var` statement produces `undefined` as its completion value.

A block can also have a completion value based on its last statement:

```js
if (true) {
    b = 4 + 38;
}
```

The block's completion value can be `42`.

Completion values are mostly useful for understanding JavaScript's internal behavior and console output.
