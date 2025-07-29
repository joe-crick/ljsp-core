import { eq$ } from "../generic/eq$";

/**
 * Checks if a function is asynchronous (marked as `async`).
 *
 * @param {Function} fn - The function to be checked.
 * @returns {boolean} - `true` if the function is asynchronous, `false` otherwise.
 */
export function async$(fn: Function) {
  return eq$(fn.constructor.name, "AsyncFunction");
}
