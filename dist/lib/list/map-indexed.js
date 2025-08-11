import { cond, ELSE } from "../conditional/cond";
import { object$ } from "../generic/object$";
/**
 * @param {Function} fn
 * @param {[]} coll
 */
export function mapIndexed(fn, coll) {
    // prettier-ignore
    const _value = cond(() => Array.isArray(coll), coll, () => object$(coll), () => Object.entries(coll), 
    // @ts-ignore
    ELSE, () => coll.split(""));
    return _value.map((item, index) => {
        return fn(index, item);
    });
}
