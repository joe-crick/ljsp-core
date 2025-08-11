import { void$ } from "../generic";
import { Collection } from "../internal/collection";
export function filter(pred, set) {
    if (void$(set)) {
        return function (step) {
            return function (result, input) {
                return pred(input) ? step(result, input) : result;
            };
        };
    }
    else {
        // @ts-ignore
        const _set = Collection(set);
        const acc = Collection(_set.empty);
        for (let i = 0; i < _set.count; i++) {
            const cur = _set.get(i);
            const result = pred(cur, i, _set);
            if (result) {
                acc.append(cur);
            }
        }
        return acc.source;
    }
}
