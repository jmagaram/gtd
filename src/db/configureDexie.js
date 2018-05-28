// https://github.com/dfahlander/Dexie.js/issues/359
const setGlobalVars = require('indexeddbshim')
const Dexie = require('dexie')

export function forNode() {
    const shim = {}
    setGlobalVars(shim, {
        checkOrigin: false
    })
    const {
        indexedDB,
        IDBKeyRange
    } = shim
    Dexie.dependencies.indexedDB = indexedDB
    Dexie.dependencies.IDBKeyRange = IDBKeyRange
}