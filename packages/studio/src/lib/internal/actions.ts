import type { ExtensionActions } from './types.js'

export const createActions = () => {
  const actions = new Map<string, ExtensionActions<Record<string, any>>>()

  const addExtensionActions = (scope: string, extensionActions: ExtensionActions<any>) => {
    actions.set(scope, extensionActions)
  }

  const removeExtensionActions = (scope: string) => {
    actions.delete(scope)
  }

  const runAction = (scope: string, actionId: string, state: any, ...args: any[]) => {
    if (!actions.has(scope)) {
      console.warn(`Extension with scope "${scope}" does not exist`)
      return undefined
    }

    const extensionActions = actions.get(scope)!

    if (!(actionId in extensionActions)) {
      console.warn(`Action with id "${actionId.toString()}" does not exist in scope "${scope}"`)
      return undefined
    }

    const action = extensionActions[actionId]

    return action({ state }, ...args)
  }

  return {
    addExtensionActions,
    removeExtensionActions,
    runAction
  }
}
