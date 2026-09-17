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

## Expression Side Effects

An expression can produce a value and also cause a **side effect**.

For example:

```js
var a = 42;
var b = a++;
```

The expression `a++` returns the old value, `42`, while changing `a` to `43`.

```js
a; // 43
b; // 42
```

Prefix and postfix operators behave differently:

```js
a++; // returns old value, then increments
++a; // increments first, then returns new value
```

Assignment expressions also produce the assigned value:

```js
a = 42;
```

The expression evaluates to `42` while also changing `a`.

This makes chained assignments possible:

```js
a = b = c = 42;
```

## Contextual Rules

JavaScript grammar can interpret the same syntax differently depending on its context.

For example, `{}` can represent different things:

```js
var obj = {
    foo: bar()
};
```

Here, `{}` is an **object literal**.

But:

```js
{
    foo: bar();
}
```

Here, `{}` is a **code block**, and `foo:` is a labeled statement.

The meaning of syntax therefore depends on where and how it appears.
