/**
 * Returns either the value or an empty Array
 * @param {boolean} pred
 * @param {*} value
 * @returns {*|*[]}
 */
export function ifArray(pred, value) {
    return pred ? value : [];
}
