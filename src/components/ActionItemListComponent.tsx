import * as React from "react";
import { T as ActionItem } from "src/containers/ActionItemContainer";
import { T as UniqueId } from "src/state/uniqueId";
import * as Store from "src/store";

export interface Properties {
  visibleIds: UniqueId[];
  store: Store.T;
}

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
  return (
    <ul>
      {p.visibleIds.map(j => (
        <li key={j as string}>
          <ActionItem store={p.store} uniqueId={j} />
        </li>
      ))}
    </ul>
  );
};
