import { inc } from "../../math";
export function listInsert(source, insert, locator, isBefore) {
    // @ts-ignore
    const index = source.findIndex(locator);
    const boundary = isBefore ? index : inc(index);
    return [
        ...source.slice(0, boundary),
        ...(Array.isArray(insert) ? insert : [insert]),
        ...source.slice(boundary, source.length)
    ];
}
