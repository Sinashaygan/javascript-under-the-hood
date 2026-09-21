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