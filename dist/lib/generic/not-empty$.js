import { empty$ } from "./empty$";
import { not } from "./not";
/**
 * @param item
 * @returns {boolean}
 */
export function notEmpty$(item) {
    return not(empty$(item));
}
