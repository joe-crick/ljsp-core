import { Collection } from "../internal/collection";
import { TCollection } from "../types/t-collection";

export function conj(set: TCollection, ...rest: Array<any>) {
  const _set = Collection(set);

  rest.forEach((item) => {
    _set.append(item);
  });

  return _set.source;
}
