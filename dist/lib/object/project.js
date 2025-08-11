import { makeArray } from "../list/make-array";
export function project(objects, keys) {
    const set = makeArray(objects);
    return set.map((item) => {
        return _pick(item, keys);
    });
}
function _pick(object, keys) {
    return Object.fromEntries(Object.entries(object).filter(([key]) => {
        return keys.includes(key);
    }));
}
