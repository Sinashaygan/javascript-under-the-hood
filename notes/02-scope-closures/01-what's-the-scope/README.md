# Chapter 1: What's the Scope?

> Independent study notes for *You Don't Know JS Yet*, 2nd Edition, Scope & Closures, Chapter 1.

## Chapter Summary

JavaScript processes a program before executing it. In that preparatory phase, it identifies declarations and maps variable references to lexical scopes. Scope is therefore determined by where functions, blocks, and declarations appear in the source, not by the order in which functions are called.

## Compilation and Execution

The chapter describes three broad compilation stages: tokenizing/lexing (identifying tokens), parsing (building an abstract syntax tree), and code generation (preparing executable instructions). Real JS engines use more sophisticated strategies, including optimization and recompilation; the useful mental model here is **processing first, execution second**.

Three observable behaviors illustrate the two phases:

1. A syntax error later in a program prevents earlier statements in that program from running.
2. An early error, such as duplicate parameter names in a strict-mode function, is detected before execution.
3. A later `let` declaration already determines which binding an earlier reference in the same block targets, even though the reference may fail in the temporal dead zone (TDZ).

```js
let greeting = "outer";

{
  // console.log(greeting); // ReferenceError: inner binding is not initialized yet
  let greeting = "inner";
  console.log(greeting); // "inner"
}
```

The TDZ is covered in detail in Chapter 5; it does not mean the engine failed to recognize the block-scoped declaration ahead of execution.

## Declaration, Assignment Target, and Value Source

For `var a = 2`, the declaration of `a` is registered during compilation and the assignment of `2` takes place during execution. Other occurrences of identifiers serve as either **targets** (a value is assigned to them) or **sources** (their value is read). These roles are not always literally left or right of `=`.

```js
const students = [{ id: 73, name: "Suzy" }];

function getStudentName(studentID) {
  for (const student of students) {
    if (student.id === studentID) return student.name;
  }
}

const nextStudent = getStudentName(73);
console.log(nextStudent); // "Suzy"
```

Here `student` is an assignment target in the `for..of` iteration; `students` is a source. The parameter `studentID` receives the argument, while its use in the comparison is a source. `getStudentName` is bound to its function declaration; its use at the call site is a source. `id`, `name`, and `log` are property names, not variable references. The consequences of failed target/source lookup are discussed in Chapter 2.

## Lexical Scope

The location of a declaration determines its scope: `var` belongs to a function scope, while `let` and `const` belong to the nearest enclosing block. An identifier reference is resolved in its current scope or a lexically enclosing scope, continuing outward as needed; it cannot look into an unrelated or inner scope.

Compilation establishes a *plan* for these scopes. The corresponding runtime scopes are created when execution reaches them, not as fully instantiated storage during compilation.

## Runtime Scope Cheats

In non-strict code, direct `eval()` with declarations can change the surrounding scope at runtime, and `with` can treat an object's properties as names in a temporary scope. Both undermine predictable lexical lookup and should be avoided. Strict mode disallows these particular scope-changing patterns (`with` is a syntax error; declarations inside strict direct `eval()` do not leak into the caller's scope).

## Common Mistakes

- Calling JS merely “line-by-line interpreted” misses its observable pre-execution processing.
- Thinking `let` is invisible until its declaration confuses recognition of a binding with the time when it becomes usable.
- Treating a property name such as `student.id` as a variable lookup obscures the distinction between lexical scope and object access.

## Long-Term Takeaways

First identify declarations and their enclosing scopes; then label each variable occurrence as a target or source. This two-phase model is the foundation for the later chapters on scope lookup, hoisting, and closure.

### Source

*scope-closures/ch1.md, “Compiling Code”, “Compiler Speak”, “Cheating: Runtime Scope Modifications”, and “Lexical Scope”.*
