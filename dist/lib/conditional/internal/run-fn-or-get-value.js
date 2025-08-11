import { function$ } from "../../generic/function$";
export function runFnOrGetValue(ifTrue, value) {
    return function$(ifTrue) ? ifTrue(value) : ifTrue;
}
