import { some } from "./some";
import { not } from "../generic/not";
export function notAny$(pred, coll) {
    return not(some(pred, coll));
}
