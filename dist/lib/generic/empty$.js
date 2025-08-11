import { count } from "../list/count";
import { eq$ } from "./eq$";
/**
 * Returns whether an Object, an Array, a Set, or a Map is empty.
 * Modified slightly from Lodash
 * @param value
 * @returns {boolean}
 */
export function empty$(value) {
    return eq$(count(value), 0);
}
