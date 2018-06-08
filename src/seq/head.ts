import * as Option from "../utility/option";
import { exactlyOne } from "./exactlyOne";
import { truncate } from "./truncate";

export function head<T extends Option.Some>(
  source: Iterable<T>
): T | undefined {
  return exactlyOne(truncate(source, 1));
}
