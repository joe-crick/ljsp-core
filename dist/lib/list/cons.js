import { Collection } from "../internal/collection";
export function cons(item, set) {
    const _set = Collection(set);
    _set.prepend(item);
    return _set.source;
}
