// @ts-nocheck
import { spec } from "../spec/spec";
import { watcher } from "./internal/constants";
import { string$ } from "../generic/string$";
import { empty$ } from "../generic/empty$";
export function removeWatch(map, key) {
    spec(removeWatch, {
        mapIsWatched: map.hasOwnProperty(watcher),
        keyIsString: string$(key)
    });
    delete map.__watcher.keys[key];
    if (empty$(map.__watcher.keys)) {
        delete map.__watcher;
    }
}
