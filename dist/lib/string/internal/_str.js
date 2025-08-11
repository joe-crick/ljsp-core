import { cond, ELSE } from "../../conditional/cond";
import { empty$ } from "../../generic/empty$";
import { void$ } from "../../generic/void$";
export function _str(delimiter, ...rest) {
    const [args] = rest;
    // prettier-ignore
    return cond(empty$(args), "", args.length === 1, () => {
        const [val] = args;
        return void$(val) ? "" : val.toString();
    }, ELSE, () => {
        const result = args.map((arg) => (void$(arg) ? "" : arg.toString()));
        return result.join(delimiter);
    });
}
