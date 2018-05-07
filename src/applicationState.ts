import { ActionItem, ApplicationState, UniqueId, View } from './types'
import { view as createView } from './view'

function applicationState(
    items: ReadonlyMap<UniqueId, ActionItem> | undefined,
    view: View | undefined): ApplicationState {
    return {
        items: items || new Map<UniqueId, ActionItem>(),
        view: view || createView({})
    }
}