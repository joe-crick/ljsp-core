import { _loopArgPairs } from "../internal/_loop-arg-pairs";
export function M(...rest) {
    const args = [];
    _loopArgPairs(rest, (one, two) => {
        args.push([one, two]);
    });
    return new Map(args);
}
