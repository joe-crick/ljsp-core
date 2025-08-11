import { Collection } from "../internal/collection";
export function conj(set, ...rest) {
    const _set = Collection(set);
    rest.forEach((item) => {
        _set.append(item);
    });
    return _set.source;
}
