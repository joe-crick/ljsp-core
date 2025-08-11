import { Collection } from "../internal/collection";
export function contains$(set, key) {
    const _set = Collection(set);
    return _set.contains$(key);
}
