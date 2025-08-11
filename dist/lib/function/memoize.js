import { first } from "../list/first";
import { iff } from "../conditional/iff";
import { identity } from "./identity";
import { eq$ } from "../generic/eq$";
import { apply } from "./apply";
export function memoize(fn, cacheKey = identity) {
    let cache = new Map();
    const memoized = function (...args) {
        const key = iff(eq$(args.length, 1), () => first(args), () => apply(cacheKey, args));
        if (cache.has(key)) {
            return cache.get(key);
        }
        else {
            const result = apply(fn, args);
            cache.set(key, result);
            return result;
        }
    };
    memoized.getCache = () => cache;
    return memoized;
}
