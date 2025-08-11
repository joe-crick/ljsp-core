export function mod(dividend, divisor) {
    let mod = dividend % divisor;
    if (mod < 0) {
        mod = divisor < 0 ? mod - divisor : mod + divisor;
    }
    return mod;
}
