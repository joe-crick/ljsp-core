export function sub(...rest) {
    if (rest.length === 1) {
        return -rest[0];
    }
    return rest.reduce((acc, cur) => {
        return acc - cur;
    });
}
