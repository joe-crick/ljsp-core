import { function$ } from "../../generic/function$";
export function _returnLast(body, arg) {
    return body.reduce((acc, cur) => {
        return function$(cur) ? cur(arg) : cur;
    }, undefined);
}
