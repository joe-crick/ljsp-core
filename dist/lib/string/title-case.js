import { capitalize } from "./capitalize";
export function titleCase(str) {
    return str.split(" ").map(capitalize).join(" ");
}
