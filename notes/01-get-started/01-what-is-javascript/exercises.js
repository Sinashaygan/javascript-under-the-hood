"use strict";

/*
 * Chapter 1 — About This Book
 *
 * Study workflow:
 *
 * 1. Predict behavior before running code.
 * 2. Explain the prediction.
 * 3. Run the example.
 * 4. Compare the result with the prediction.
 * 5. Modify the example and test the mental model again.
 */

function createLogger(value) {
  return function logValue() {
    console.log(value);
  };
}

const log = createLogger("first");

log();
