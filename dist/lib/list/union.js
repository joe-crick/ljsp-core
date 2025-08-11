export function union(...rest) {
    return Array.from(new Set(rest.flat()));
}
