import { eq$ } from "../../generic/eq$";
import { not } from "../../generic/not";
export function _compare(values, comparator) {
    if (eq$(values.length, 1)) {
        return true;
    }
    let [comparison] = values;
    for (let x = 1; x < values.length; x++) {
        const result = comparator(comparison, values[x]);
        if (not(result)) {
            return false;
        }
        comparison = values[x];
    }
    return true;
}
