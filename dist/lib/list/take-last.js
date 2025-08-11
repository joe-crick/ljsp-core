import { Collection } from "../internal/collection";
export function takeLast(n, coll) {
    const _set = Collection(coll, false);
    return _set.slice(_set.count - n);
}
