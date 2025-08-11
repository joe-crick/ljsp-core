import { runFnOrGetValue } from "./internal/run-fn-or-get-value";
export function ifYes(condition, expression) {
    return condition ? runFnOrGetValue(expression) : undefined;
}
