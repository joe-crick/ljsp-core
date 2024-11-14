import { empty$, eq, rest } from "ljsp-core";

/**
 * Executes a series of functions (synchronously or asynchronously) and returns the final result.
 *
 * @param value - The value to be transformed.
 * @param {...Function} fns - An array of functions to be executed. Any async functions must be declared as async.
 * @returns {Promise<any>} - The final result after executing all the functions.
 */
export async function atf(value, ...fns) {
  return await run(fns, value);
}

/**
 * Recursively executes the provided functions, passing the result of one function to the next.
 *
 * @param {Function[]} fns - An array of functions to be executed.
 * @param {any} result - The initial value or the result of the previous function.
 * @returns {Promise<any>} - The final result after executing all the functions.
 */
async function run(fns, result) {
  if (empty$(fns)) {
    return result;
  }

  const [fn] = fns;
  result = isAsync(fn) ? await fn(result) : fn(result);

  return await run(rest(fns), result);
}

/**
 * Checks if a function is asynchronous (marked as `async`).
 *
 * @param {Function} fn - The function to be checked.
 * @returns {boolean} - `true` if the function is asynchronous, `false` otherwise.
 */
function isAsync(fn) {
  return eq(fn.constructor.name, "AsyncFunction");
}
