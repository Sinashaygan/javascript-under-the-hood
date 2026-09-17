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

## Labels and Blocks

JavaScript supports labeled statements:

```js
foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if (j === i) {
            continue foo;
        }
    }
}
```

A label can be used with `break` and `continue` to control an outer loop.

Labeled statements are valid JavaScript but are uncommon in modern application code.

A standalone `{}` creates a normal block:

```js
{
    let value = 42;
}
```

Blocks are especially useful with block-scoped declarations such as `let` and `const`.

## Object Destructuring

Object destructuring allows properties to be extracted from an object:

```js
var {
    a,
    b
} = obj;
```

It can also be used in function parameters:

```js
function foo({ name, age }) {
    console.log(name, age);
}
```

The same `{}` syntax therefore has different meanings depending on its context.

Destructuring is especially common in modern JavaScript and React code.

## Conditional Blocks

JavaScript allows optional blocks for some control structures:

```js
if (condition)
    doSomething();
```

A block can also be used:

```js
if (condition) {
    doSomething();
}
```

Multiple conditions can be chained with `else if`:

```js
if (a) {
    // ...
}
else if (b) {
    // ...
}
else {
    // ...
}
```

Using braces consistently generally makes code easier to read and maintain.

## Operator Precedence

Operator precedence determines how an expression is grouped.

For example:

```js
var result = 2 + 3 * 4;
```

Multiplication has higher precedence than addition, so this is evaluated as:

```js
2 + (3 * 4);
```

Result:

```js
14
```

Parentheses can explicitly control grouping:

```js
var result = (2 + 3) * 4;
```

Result:

```js
20
```

Understanding precedence helps avoid unexpected expression results.

## Short-Circuit Evaluation

Logical operators can stop evaluating as soon as the final result is known.

For `&&`, if the left side is falsy, the right side is not evaluated.

```js
false && doSomething();
```

For `||`, if the left side is truthy, the right side is not evaluated.

```js
true || doSomething();
```

This behavior is called **short-circuit evaluation**.

It is commonly used for conditional execution and default values.

## Associativity

When multiple operators have the same precedence, **associativity** determines how they are grouped.

For example:

```js
a && b && c
```

is generally grouped from left to right:

```js
(a && b) && c
```

Some operators, such as the conditional operator, associate from right to left:

```js
a ? b : c ? d : e
```

is interpreted as:

```js
a ? b : (c ? d : e)
```

Associativity determines grouping, not necessarily the order in which expressions are evaluated.
