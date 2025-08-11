import { makeArray } from "../list/make-array";
export function comp(...fns) {
    return function (...args) {
        return fns.reduceRight((acc, fn) => {
            return fn(...makeArray(acc));
        }, args);
    };
}
