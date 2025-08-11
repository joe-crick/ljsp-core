import { not } from "./not";
export function numeric$(item) {
    return not(isNaN(item));
}
