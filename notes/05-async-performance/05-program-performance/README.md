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