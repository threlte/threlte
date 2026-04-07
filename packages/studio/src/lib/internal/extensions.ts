import { getContext, onDestroy, setContext } from 'svelte'
import { createActions } from './actions.js'
import { createKeyboardControls, hotkeyFns } from './keyboard.js'
import { createState } from './state.svelte.js'
import { beforeUnload } from './useBeforeUnload.js'
import type { ExtensionActions } from './types.js'

export const createRootContext = (namespace: string, transient: boolean) => {
  const state = createState(namespace, transient)
  const actions = createActions()
  const keyboardControls = createKeyboardControls((scope, actionId) => {
    actions.runAction(scope, actionId, state.getScopedState(scope).state)
  })

  const useExtension = <
    State extends Record<string, unknown>,
    Actions extends Record<string, (...args: any[]) => Promise<void> | void>,
    NonPartial extends boolean = false
  >(
    scope: string
  ) => {
    const scopedState = state.getScopedState<State, NonPartial>(scope).state

    const extension = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          if (prop === 'state') {
            return scopedState
          }
          return (...args: any[]) => {
            actions.runAction(scope, prop, scopedState, ...args)
          }
        }
      }
    ) as Actions & {
      state: ReturnType<typeof state.getScopedState<State, NonPartial>>['state']
    }

    return extension
  }

  const removeExtension = (scope: string) => {
    state.persistState(scope)
    state.removeScopedState(scope)
    actions.removeExtensionActions(scope)
    keyboardControls.removeKeys(scope)
  }

  const createExtension = <
    State extends Record<string, unknown>,
    Actions extends Record<string, (...args: any[]) => Promise<void> | void>
  >(options: {
    scope: string
    state: (args: { persist: <T>(value: T) => T }) => State
    actions: {
      [K in keyof Actions]: (
        params: {
          state: State
        },
        ...args: Parameters<Actions[K]>
      ) => ReturnType<Actions[K]>
    }
    keyMap?: (utils: typeof hotkeyFns) => {
      [Key in keyof Actions]?: Parameters<Actions[Key]> extends []
        ? string | string[] | { up?: string | string[]; down?: string | string[] }
        : never
    }
  }) => {
    state.addExtensionState(options.scope, options.state)
    actions.addExtensionActions(
      options.scope,
      options.actions as unknown as ExtensionActions<State>
    )
    if (options.keyMap) {
      const keyMap = options.keyMap(hotkeyFns)
      keyboardControls.addKeys(options.scope, keyMap)
    }

    onDestroy(() => {
      removeExtension(options.scope)
    })

    return useExtension<State, Actions, true>(options.scope)
  }

  const context = {
    state,
    actions,
    createExtension,
    useExtension
  }

  setContext('threlte:studio:extensions', context)

  // the last thing to do before the window is being closed is to persist the
  // state to the local storage
  beforeUnload(state.persistState, true)

  return context
}

export const useStudio = () => {
  return getContext<ReturnType<typeof createRootContext>>('threlte:studio:extensions')
}
