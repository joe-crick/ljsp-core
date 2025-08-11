export function repeatedly(fn, n) {
    let acc = [];
    for (let x = 0; x < n; x++) {
        acc.push(fn());
    }
    return acc;
}
