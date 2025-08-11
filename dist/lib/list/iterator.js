import { Collection } from "../internal/collection";
export function iterator(set) {
    const _set = Collection(set, false);
    let count = 0;
    return function () {
        if (count < _set.count) {
            let value = _set.get(count);
            count += 1;
            return value;
        }
    };
}
