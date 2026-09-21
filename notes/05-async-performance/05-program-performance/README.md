# Chapter 5: Program Performance

Asynchronous programming is important because it can improve both
actual performance and the user's perception of performance.

For independent asynchronous operations, running them concurrently
is usually more efficient than running them serially.

For example:

Serial:
Task A → wait → Task B → wait → Continue

Concurrent:
Task A ─────┐
            ├──→ Continue
Task B ─────┘

Asynchrony allows independent operations to overlap instead of
unnecessarily waiting for one another.

However, asynchronous execution does not automatically mean
parallel execution.

## Web Workers

JavaScript execution is traditionally single-threaded, but browsers
can create additional JavaScript execution contexts using Web Workers.

A Web Worker runs JavaScript on a separate thread, allowing
CPU-intensive work to be moved away from the main UI thread.

This is useful because long-running computations on the main thread
can block the UI and make the application unresponsive.

Web Workers provide task parallelism:

Main Thread
    │
    ├── UI
    └── Application Logic

Worker Thread
    │
    └── Heavy Computation

A Worker is created with:

const worker = new Worker("./worker.js");

The Worker runs independently from the main program.

## Worker Communication

Workers do not share scope or resources with the main JavaScript
program.

Instead, they communicate through message passing.

Main thread:

worker.postMessage("Hello Worker");

worker.addEventListener("message", (event) => {
    console.log(event.data);
});

Worker:

addEventListener("message", (event) => {
    console.log(event.data);

    postMessage("Hello Main Thread");
});

The communication model is symmetrical:

Main Thread
    │
    │ postMessage()
    ↓
 Worker
    │
    │ postMessage()
    ↓
Main Thread

This avoids the shared-memory problems commonly associated with
traditional multithreaded programming.

## Worker Environment

A Worker has its own JavaScript environment.

It cannot directly access:

- The main program's variables
- The main program's scope
- The page DOM
- Other main-thread resources

However, Workers can perform several useful operations such as:

- Network requests
- WebSockets
- Timers
- JSON operations
- Accessing their own navigator and location objects

Additional scripts can be loaded with:

importScripts("foo.js", "bar.js");

importScripts() loads scripts synchronously inside the Worker,
so the Worker waits until they have been loaded and executed.

## Data Transfer

Because Workers do not share memory with the main thread,
data must be transferred between them.

Older approaches serialized data into strings:

JSON.stringify(data);
JSON.parse(data);

This introduced serialization overhead and required the data
to be duplicated.

Modern Workers can use the Structured Cloning Algorithm:

worker.postMessage(data);

Structured cloning creates a copy of the data in the receiving
execution context.

This avoids manual serialization but still requires additional
memory because the data is duplicated.

## Transferable Objects

For large data sets, copying data can still be expensive.

Transferable Objects provide another option.

Instead of copying the data, ownership of the underlying data
is transferred to the Worker.

Example:

const buffer = new ArrayBuffer(1024);

worker.postMessage(buffer, [buffer]);

The second argument specifies which objects should be transferred.

After transferring ownership, the original context can no longer
use the transferred data normally.

This makes transferring large binary data much more efficient
than copying it.

Typed arrays such as Uint8Array can transfer their underlying
ArrayBuffer:

worker.postMessage(data.buffer, [data.buffer]);

The important distinction is:

Structured Clone → Copy the data

Transferable Object → Transfer ownership of the data

## Shared Workers

A Dedicated Worker belongs to a single page or program instance.

A SharedWorker can instead be shared by multiple pages or tabs.

Dedicated Workers:

Tab A → Worker A
Tab B → Worker B
Tab C → Worker C

Shared Worker:

Tab A ─┐
Tab B ─┼──→ Shared Worker
Tab C ─┘

Shared Workers can reduce duplicated resources and can be useful
when multiple tabs need to communicate through a common Worker.

Because multiple connections can exist, Shared Workers communicate
through ports.

Example:

const worker = new SharedWorker("./worker.js");

worker.port.postMessage("Hello");

worker.port.addEventListener("message", handler);

worker.port.start();

Inside the Worker, the "connect" event provides the port associated
with each connection.

## Dedicated vs Shared Workers

Dedicated Worker:

- One-to-one relationship
- Created for a specific page
- Simpler communication model
- Terminates when its initiating connection ends

Shared Worker:

- Can serve multiple pages or tabs
- Uses ports for communication
- Can remain alive while other connections still exist

Both types provide the same general Worker execution model,
but Shared Workers introduce connection management through ports.

## Polyfilling Web Workers

Web Workers are an API provided by the browser environment,
not a JavaScript language feature.

Because of this, parts of the Worker API can be polyfilled.

However, a polyfill cannot truly reproduce multithreading.

Timers such as:

setTimeout(...)

can simulate asynchronous behavior, but they do not create
a real parallel execution thread.

Therefore:

Async simulation ≠ real parallelism

A Worker polyfill may reproduce the API and messaging behavior,
but it cannot provide the same performance benefits as a real
multithreaded Worker.

## SIMD

SIMD stands for:

Single Instruction, Multiple Data

SIMD is a form of data parallelism.

Unlike Web Workers, which divide different tasks between threads,
SIMD applies the same operation to multiple pieces of data at once.

Example:

Normal processing:

1 × 2
2 × 2
3 × 2
4 × 2

SIMD concept:

[1, 2, 3, 4] × 2
        ↓
[2, 4, 6, 8]

The main difference is:

Web Workers → Task Parallelism

SIMD → Data Parallelism

SIMD is especially useful for data-intensive operations such as
mathematical calculations, graphics, signal processing, and
matrix operations.

## asm.js

asm.js is a highly optimizable subset and coding style of JavaScript.

It was designed to make JavaScript easier for engines to optimize
at a low level.

The main idea was to avoid patterns that make optimization difficult,
such as:

- Excessive type changes
- Dynamic coercion
- Garbage collection pressure

asm.js allows JavaScript engines to recognize predictable code and
apply more aggressive optimizations.

It does not introduce a completely new programming language.
Instead, it uses valid JavaScript syntax with specific patterns
that engines can optimize.

## asm.js Type Optimization

JavaScript is dynamically typed, which means variables can contain
values of different types.

This can make optimization more difficult.

asm.js-style code can provide type hints.

For example:

var a = 42;
var b = a | 0;

The:

| 0

operation forces the value to a 32-bit integer.

Another example:

(a + b) | 0

This indicates that the result should be treated as a 32-bit
integer.

These patterns reduce the amount of type and coercion tracking
the engine needs to perform.

## asm.js Modules

asm.js code can be organized into specialized modules that work
with explicitly managed memory.

A typical asm.js module may receive:

- stdlib
- foreign
- heap

The heap can be represented by an ArrayBuffer:

var heap = new ArrayBuffer(0x10000);

Typed arrays can then provide structured access to that memory.

This approach allows code to operate with predictable memory and
data representations.

However, asm.js is generally intended to be generated by compilers
rather than written manually.

Tools such as Emscripten can compile lower-level languages into
asm.js-style JavaScript.

## Review

The main performance concepts from this chapter are:

1. Asynchrony can improve performance by allowing independent work
   to proceed concurrently.

2. Asynchrony and parallelism are not the same thing.

3. CPU-intensive work can block the main JavaScript thread.

4. Web Workers allow work to run on separate threads.

5. Workers communicate through postMessage() and message events.

6. Workers do not share normal JavaScript scope or DOM resources.

7. Structured Cloning copies data between execution contexts.

8. Transferable Objects transfer ownership instead of copying
   certain data.

9. Shared Workers allow multiple pages or tabs to communicate
   with a common Worker.

10. SIMD provides data parallelism by applying one instruction to
    multiple values.

11. Web Workers provide task parallelism.

12. asm.js is a highly optimizable JavaScript subset/style that
    historically targeted low-level performance optimization.

The key distinction is:

Async Programming
    ↓
Concurrency

Web Workers
    ↓
Task Parallelism

SIMD
    ↓
Data Parallelism

asm.js
    ↓
Low-level JavaScript Optimization