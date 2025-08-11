import { reduced$ } from "./reduced$";
import { reduced } from "./reduced";
export function ensureReduced(item) {
    return reduced$(item) ? item : reduced(item);
}
