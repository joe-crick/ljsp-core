/**
 * @param {[]} set
 * @param {[]} subset
 * @returns {*}
 */
export function subset$(set, subset) {
    return subset.every((item) => set.includes(item));
}
