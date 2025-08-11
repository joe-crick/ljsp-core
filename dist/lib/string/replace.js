// @ts-nocheck
import { regExp$ } from "../generic/reg-exp$";
import { array$ } from "../generic/array$";
import { second } from "../list/second";
import { first } from "../list/first";
import { str } from "./str";
export function replace(s, match, replacement) {
    var _a;
    const isRegMatch = regExp$(match);
    match = new RegExp(isRegMatch ? match.source : match, isRegMatch ? str(match.flags, match.flags.includes("g") ? "" : "g") : "g");
    if (array$(replacement)) {
        const matches = (_a = s.matchAll(match)) !== null && _a !== void 0 ? _a : [];
        for (const match of matches) {
            let matchSet = first(replacement).reduce((acc, cur) => (acc += match[cur]), "");
            s = s.replace(new RegExp(first(match), "g"), str(matchSet, second(replacement)));
        }
        return s;
    }
    else {
        return s.replace(match, replacement);
    }
}
