import { View } from './types'

export function view(p: Partial<View>): View {
    return {
        onlyShowImportant: p.onlyShowImportant || false,
        onlyShowIncomplete: p.onlyShowIncomplete || true
    };
}

export function toggleOnlyShowImportant(v: View): View {
    return modifyView(v, { onlyShowImportant: !v.onlyShowImportant });
}

export function toggleOnlyShowIncomplete(v: View): View {
    return modifyView(v, {onlyShowIncomplete: !v.onlyShowIncomplete });
}

function modifyView(
    source: View,
    delta: Partial<View>): View {
    return {
        onlyShowImportant: delta.onlyShowImportant || source.onlyShowImportant,
        onlyShowIncomplete: delta.onlyShowIncomplete || source.onlyShowIncomplete
    };
}
