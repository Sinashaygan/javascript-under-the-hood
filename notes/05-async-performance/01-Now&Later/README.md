# Asynchrony: Now & Later

> Technical study notes for *You Don't Know JS: Async & Performance*, Chapter 1.
> The chapter's ES6-era terminology is retained where useful, with modern
> browser, ECMAScript, V8, and Node.js distinctions called out explicitly.

## 1. A Program in Chunks: "Now" and "Later"

Asynchrony is fundamentally about **a program whose execution is split across
time**. Some work runs in the current execution turn ("now"); other work cannot
run until an external condition is satisfied and a future execution opportunity
is granted ("later"). The time between those chunks is not JavaScript code
quietly waiting on the call stack. The current chunk finishes, its stack is
discarded, and a host environment may invoke another chunk later.

Typical boundaries between now and later include:

- a timer reaching its threshold;
- a network, file-system, or database operation completing;
- a user-input event becoming ready for dispatch;
- a rendered frame or animation callback becoming eligible;
- a Promise reaction being scheduled after settlement.

The most common unit of asynchronous chunking is a function used as a callback.
It packages the code and its lexical references so the host or runtime can call
it after the initiating code has returned.

```js
function now() {
  return 21;
}

function later() {
  answer *= 2;
  console.log("Meaning of life:", answer);
}

let answer = now();         // current synchronous chunk
setTimeout(later, 1_000);   // registers future work, then returns
```

The two execution chunks are:

```text
Current turn (now)                  Future turn (later)
--------------------------------   -----------------------------
define now() and later()           enter later()
call now()                          read and update answer
assign answer = 21                  call console.log(...)
register a one-second timer         return; future stack is empty
finish the current script
```

`setTimeout()` does **not** pause the function, create a sleeping JavaScript
stack, or guarantee execution at an exact wall-clock instant. It asks the host
to track a timer. Once the delay threshold has elapsed, the callback becomes
eligible to be scheduled; it still must wait until JavaScript can run it.

### Non-blocking I/O and continuation code

An asynchronous API cannot return a result that does not exist yet:

```js
const data = ajax("/api/report");
console.log(data); // not the eventual response
```

The call starts an operation and returns before the remote result arrives. Code
that depends on that result must be moved into a later continuation:

```js
ajax("/api/report", function onReport(data) {
  console.log(data);
});
```

Modern APIs frequently represent the same relationship with a Promise and
`await`, but the temporal split still exists. `await` does not turn network I/O
into blocking I/O; it suspends that async function and schedules its continuation
after the awaited Promise settles.

```js
async function showReport() {
  const response = await fetch("/api/report");
  const data = await response.json();
  console.log(data);
}
```

This leads to the chapter's central design problem: state must remain coherent
across a gap during which other work may run. Shared variables, DOM state,
request ordering, cancellation, and errors can all change between initiation
and continuation.

### Language, engine, and host are different layers

"JavaScript does X" often compresses three distinct responsibilities:

| Layer | Browser example | Node.js example | Responsibility |
| --- | --- | --- | --- |
| ECMAScript language | functions, execution contexts, Promises | same | Defines syntax, values, execution semantics, and abstract Jobs/host hooks. |
| JavaScript engine | V8 in Chromium | V8 in Node.js | Parses, compiles, optimizes, and executes ECMAScript; manages stacks, heaps, and Promise microtasks with embedder integration. |
| Host/embedder | Chromium/Blink and Web Platform APIs | Node.js and libuv | Supplies timers, networking, DOM or file-system APIs, event-loop policy, and opportunities to enter the engine. |

V8 alone is not "the browser" and does not provide the DOM, `fetch()`, or the
web event loop. Chromium embeds V8 and connects it to Web Platform facilities.
Node.js also embeds V8, but exposes a different global API surface and uses a
different event-loop implementation and scheduling policy. The ECMAScript
specification deliberately leaves host integration points for these environments.

### Async console caveats

`console.*` is a host-provided debugging interface, not an ECMAScript language
primitive. Its display behavior therefore must not be treated as a precise
record of engine-level execution or object state.

```js
const record = { index: 1 };

console.log(record);
record.index++;
```

Developer tools may retain a reference to `record` and render or expand it only
when the user inspects the entry. The console can then display `{ index: 2 }`
even though `index` was `1` when `console.log()` was called. This is chiefly a
debugger/host presentation issue, not evidence that the assignment executed
before the log statement.

For a stable observation:

```js
console.log(structuredClone(record)); // snapshot clone, where supported
console.log(JSON.stringify(record));  // serialized snapshot, with JSON limits
```

For ordering bugs, debugger breakpoints and watch expressions are generally
stronger evidence than console rendering. Also remember that `console.log()`
itself can perform I/O and may perturb timing, especially in hot paths.

### Topic 1 invariants

1. Asynchronous work is organized as separate execution chunks, not as one
   continuously blocked JavaScript call stack.
2. A timer delay is an eligibility threshold, not a deadline or exact schedule.
3. A callback or async-function continuation carries the computation across the
   gap, while program state may change during that gap.
4. Browser/Node APIs and event-loop policies belong to the host; language
   semantics and abstract Promise Jobs belong to ECMAScript; V8 is one concrete
   engine used by multiple hosts.
5. Console output is diagnostic host behavior and may show live objects rather
   than immutable snapshots.
