export function apply(fn, ...rest) {
    const args = rest.flat();
    return fn(...args);
}
