import { Collection } from "../internal/collection";
/**
 * @param {[]} set
 * @returns {*}
 */
export function rest(set) {
    const _set = Collection(set);
    return _set.slice(1);
}
