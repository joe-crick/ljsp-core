export function add(...rest) {
    if (rest.length === 0) {
        return 0;
    }
    return rest.reduce((acc, cur) => {
        return acc + cur;
    });
}
