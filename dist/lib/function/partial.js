import { apply } from "./apply";
export function partial(fn, ...rest) {
    return function (...args) {
        return apply(fn, [...rest, ...args]);
    };
}
