/**
 * Executes a series of functions (synchronously or asynchronously) and returns the final result.
 *
 * @param value - The value to be transformed.
 * @param {...Function} fns - An array of functions to be executed. Any async functions must be declared as async.
 * @returns {Promise<any>} - The final result after executing all the functions.
 */
export declare function atf(value: any, ...fns: Function[]): Promise<any>;
