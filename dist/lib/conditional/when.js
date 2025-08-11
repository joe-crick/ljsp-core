import { _returnLast } from "./internal/_return-last";
/**
 * @param condition
 * @param rest
 */
export function when(condition, ...rest) {
    if (condition) {
        return _returnLast(rest);
    }
}
