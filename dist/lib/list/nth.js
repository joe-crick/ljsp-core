import { Collection } from "../internal/collection";
import { array$ } from "../generic/array$";
export function nth(set, index, notFound) {
    var _a, _b;
    if (array$(set)) {
        // @ts-ignore
        return (_a = set[index]) !== null && _a !== void 0 ? _a : notFound;
    }
    else {
        const _set = Collection(set, false);
        return (_b = _set.get(index)) !== null && _b !== void 0 ? _b : notFound;
    }
}
