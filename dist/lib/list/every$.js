import { empty$ } from "../generic/empty$";
import { not } from "../generic/not";
export function every$(pred, coll) {
    if (empty$(coll)) {
        return true;
    }
    for (let x = 0; x < coll.length; x++) {
        if (not(pred(coll[x]))) {
            return false;
        }
    }
    return true;
}
