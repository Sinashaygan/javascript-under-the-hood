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