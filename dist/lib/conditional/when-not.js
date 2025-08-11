import { _returnLast } from "./internal/_return-last";
/**
 * @param condition
 * @param rest
 */
export function whenNot(condition, ...rest) {
    if (!condition) {
        return _returnLast(rest);
    }
}
