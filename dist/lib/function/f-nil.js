import { notEq$ } from "../generic/not-eq$";
import { extendArray } from "../list/extend-array";
import { fillVoid } from "../list/fill-void";
export function fNil(fn, ...template) {
    return function (...source) {
        if (notEq$(source.length, template.length)) {
            extendArray(source, template.length);
        }
        return fn.apply(null, fillVoid(source, template));
    };
}
