import { typedSet$ } from "./internal/typed-set$";
import { number$ } from "./number$";
export function numberSet$(set) {
    return typedSet$(set, number$);
}
