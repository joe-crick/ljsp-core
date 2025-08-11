import { _compare } from "./internal/compare-vals";
/**
 * Returns true if nums are in monotonically decreasing order,
 * otherwise false.
 * @param {number} rest
 */
export function gt$(...rest) {
    return _compare(rest, greaterThan);
}
function greaterThan(a, b) {
    return a > b;
}
