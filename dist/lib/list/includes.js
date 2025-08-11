import { Collection } from "../internal/collection";
export function includes(set, ...rest) {
    const _set = Collection(set, false);
    return rest.every((item) => _set.contains$(item));
}
