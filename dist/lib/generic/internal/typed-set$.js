export function typedSet$(set, fn) {
    return set.every((item) => fn(item));
}
