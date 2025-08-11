import { Collection } from "../internal/collection";
export function concat(set, ...rest) {
    const _set = Collection(set);
    rest.forEach((item) => {
        _set.appendAll(item);
    });
    return _set.source;
}
