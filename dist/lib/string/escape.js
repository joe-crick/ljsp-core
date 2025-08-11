import { get } from "../list";
import { object$ } from "../generic/object$";
import { string$ } from "../generic/string$";
import { spec } from "../spec/spec";
export function escape(baseString, cmap) {
    spec(escape, {
        baseString: string$(baseString),
        isValidCmap: object$(cmap)
    });
    let escaped = "";
    for (let index = 0; index < baseString.length; index++) {
        const ch = baseString.charAt(index);
        const replacement = get(cmap, ch);
        escaped += replacement !== null && replacement !== void 0 ? replacement : ch;
    }
    return escaped;
}
