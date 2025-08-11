export function dotimes(times, fn) {
    for (let x = 0; x < times; x++) {
        fn(x);
    }
}
