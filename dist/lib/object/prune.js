import { reduceKv } from "../list/reduce-kv";
import { void$ } from "../generic/void$";
import { not } from "../generic/not";
import { eq$ } from "../generic";
import { and } from "../conditional";
export function prune(object) {
    return reduceKv((acc, key, value) => {
        if (and(not(void$(value)), not(eq$(value, "")))) {
            // @ts-ignore
            acc[key] = value;
        }
        return acc;
    }, {}, object);
}
