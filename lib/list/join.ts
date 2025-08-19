export function join(separator: string, collection: Iterable<any> | ArrayLike<any>) {
  const set = Array.isArray(collection) ? collection : Array.from(collection);
  return set.join(separator);
}
