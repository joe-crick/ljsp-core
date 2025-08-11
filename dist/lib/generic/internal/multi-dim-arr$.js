export function multiDimArr$(arr) {
    return arr.every((item) => Array.isArray(item));
}
