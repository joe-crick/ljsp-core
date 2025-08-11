import { _compare } from "./internal/compare-vals";
/**
 * Returns true if nums are in monotonically increasing order,
 * otherwise false.
 * @param {number} rest
 */
export function lt$(...rest) {
    return _compare(rest, lessThan);
}
function lessThan(a, b) {
    return a < b;
}
