import { scopeId } from './scopeUtils.js'

// Persistance
const persist = {
  regular: <T>(value: T): T => {
    return value
  },
  dummy: <T>(): T => {
    return '__threlte-studio-persisted-value__' as unknown as T
  }
}

const persistedDummyValue = '__threlte-studio-persisted-value__'

const isObject = (d: any): d is Record<string, any> => {
  return typeof d === 'object' && !Array.isArray(d) && d !== null
}

const getPersistedPaths = function (obj: Record<string, unknown>, prefix?: string) {
  const keys = Object.keys(obj)
  prefix = prefix ? `${prefix}.` : ''
  return keys.reduce<string[]>((result, key) => {
    if (isObject(obj[key])) {
      result = [...result, ...getPersistedPaths(obj[key] as Record<string, unknown>, prefix + key)]
    } else if (obj[key] === persistedDummyValue) {
      result.push(prefix + key)
    }
    return result
  }, [])
}

export const createState = (namespace: string, transient: boolean) => {
  const state = $state<Record<string, Record<string, unknown>>>({})

  // the key is the scope and the value is the path to the persisted state
  const persistedStatePaths: Record<string, string[]> = {}

  const addExtensionState = <T extends Record<string, unknown>>(
    scope: string,
    createState: (args: { persist: <U>(value: U) => U }) => T
  ): T => {
    const extensionState = createState({ persist: persist.regular })

    if (!transient) {
      const persistedState = createState({ persist: persist.dummy })
      const persistedPaths = getPersistedPaths(persistedState)

      persistedStatePaths[scope] = persistedPaths

      for (const path of persistedPaths) {
        const scopedKey = scopeId(namespace, scope, path)
        const stringValue = localStorage[scopedKey] as string | undefined
        if (stringValue && stringValue !== 'undefined') {
          const parsedValue = JSON.parse(stringValue) as unknown
          const pathParts = path.split('.')
          const lastPart = pathParts.pop()
          if (!lastPart) {
            throw new Error(`Path "${path}" is not valid`)
          }
          let value: unknown = extensionState
          for (const pathPart of pathParts) {
            if (!isObject(value)) {
              throw new Error(`Path "${path}" is not valid`)
            }
            value = value[pathPart]
          }
          if (!isObject(value)) {
            throw new Error(`Path "${path}" is not valid`)
          }
          value[lastPart] = parsedValue
        }
      }
    }

    state[scope] = extensionState
    return state[scope] as T
  }

  const getScopedState = <T extends Record<string, unknown>, NonPartial extends boolean = false>(
    scope: string
  ) => {
    return {
      get state() {
        return (state[scope] ?? {}) as NonPartial extends true ? T : Partial<T>
      }
    }
  }

  const removeScopedState = (scope: string): void => {
    delete state[scope]
    delete persistedStatePaths[scope]
  }

  const persistState = (scope?: string) => {
    if (transient) return
    for (const [currentScope, paths] of Object.entries(persistedStatePaths)) {
      if (scope && currentScope !== scope) continue
      const state = getScopedState(currentScope).state
      for (const path of paths) {
        const scopedKey = scopeId(namespace, currentScope, path)
        const pathParts = path.split('.')
        let value: unknown = state
        for (const pathPart of pathParts) {
          if (!isObject(value)) {
            throw new Error(`Path "${path}" is not valid`)
          }
          value = value[pathPart]
        }
        localStorage[scopedKey] = JSON.stringify(value)
      }
    }
  }

  return {
    addExtensionState,
    getScopedState,
    removeScopedState,
    persistState,
    state
  }
}
