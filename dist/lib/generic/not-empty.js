import { empty$ } from "./empty$";
export function notEmpty(set) {
    return empty$(set) ? undefined : set;
}
