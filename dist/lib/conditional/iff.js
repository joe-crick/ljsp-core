import { runFnOrGetValue } from "./internal/run-fn-or-get-value";
export function iff(condition, ifTrue, ifFalse) {
    return runFnOrGetValue(condition) ? runFnOrGetValue(ifTrue) : runFnOrGetValue(ifFalse);
}
