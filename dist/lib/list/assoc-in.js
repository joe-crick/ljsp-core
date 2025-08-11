// @ts-nocheck
import { second } from "./second";
import { cloneDeep } from "../generic/clone-deep";
export function assocIn(set, keys, value) {
    const result = cloneDeep(set);
    const [index] = keys;
    if (set[index]) {
        const prop = second(keys);
        result[index][prop] = cloneDeep(value);
    }
    else {
        result[index] = cloneDeep(value);
    }
    return result;
}
