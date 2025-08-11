import { _compare } from "./internal/compare-vals";
/**
 * Returns true if nums are in monotonically increasing order,
 * otherwise false.
 * @param {number} rest
 */
export function lte$(...rest) {
    return _compare(rest, lessThanEqual);
}
function lessThanEqual(a, b) {
    return a <= b;
}
