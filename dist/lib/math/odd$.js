import { eq$, notEq$ } from "../generic";
export function odd$(num) {
    return eq$(num, 0) ? false : notEq$(num % 2, 0);
}
