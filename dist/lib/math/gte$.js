import { _compare } from "./internal/compare-vals";
/**
 * Returns true if nums are in monotonically decreasing order,
 * otherwise false.
 * @param {number} rest
 */
export function gte$(...rest) {
    return _compare(rest, greaterThanEqual);
}
function greaterThanEqual(a, b) {
    return a >= b;
}
