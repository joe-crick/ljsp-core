import { void$ } from "../generic/void$";
/**
 * @param {[]} left
 * @param {[]} right
 * @returns {[]}
 */
export function difference(left, ...right) {
    if (void$(right)) {
        return left;
    }
    return right.reduce((acc, cur) => {
        return acc.filter((x) => !cur.includes(x));
    }, left);
}
