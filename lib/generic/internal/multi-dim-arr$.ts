export function multiDimArr$(arr: any) {
  return arr.every((item: any) => Array.isArray(item));
}
