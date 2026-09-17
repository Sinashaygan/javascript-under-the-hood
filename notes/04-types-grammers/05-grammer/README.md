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
