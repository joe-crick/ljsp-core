import { _returnLast } from "../conditional/internal/_return-last";
export function doWork(...rest) {
    return _returnLast(rest);
}
