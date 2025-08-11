import { take } from "./take";
import { takeLast } from "./take-last";
import { Collection } from "../internal/collection";
/**
 * @param {number} num
 * @param {[]} set
 */
export function splitAt(num, set) {
    const _set = Collection(set, false);
    return [take(num, _set), takeLast(_set.count - num, set)];
}
