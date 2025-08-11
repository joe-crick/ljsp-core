import { typedSet$ } from "./internal/typed-set$";
export function arraySet$(set) {
    return typedSet$(set, (item) => Array.isArray(item));
}
