import { type Writable, writable } from 'svelte/store'
import { browser } from './browser'

/**
 * This singleton's purpose is for caching stores only during a browser session.
 * It is disabled on the server.
 */
const stores: Record<string, Writable<unknown> | undefined> = {}

let prefix = ''

const parse = <T>(value: string | null): T | null => {
  if (value === null) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

if (browser) {
  window.addEventListener('storage', ({ key, newValue }: StorageEvent) => {
    if (key === null) {
      return
    }
    const store = stores[key]
    if (store !== undefined) {
      store.set(parse(newValue))
    }
  })
}

const getStorage = (type: 'local' | 'session') => {
  return type === 'local' ? localStorage : sessionStorage
}

const createPersisted = <T>(
  key: string,
  initialValue: T | null,
  storage: ReturnType<typeof getStorage>,
) => {
  const initialOrStoredValue = parse<T>(storage.getItem(key)) ?? initialValue
  const store = writable<T | null>(initialOrStoredValue)

  storage.setItem(key, JSON.stringify(initialOrStoredValue))

  const { subscribe, set } = store

  return {
    set(value: T): void {
      storage.setItem(key, JSON.stringify(value))
      set(value)
    },
    update(callback: (value: T | null) => T | null): void {
      store.update((last) => {
        const value = callback(last)
        storage.setItem(key, JSON.stringify(value))
        return value
      })
    },
    subscribe,
  } satisfies Writable<T | null>
}

/**
 * Creates a writable store that persists in localStorage
 *
 * @param key The storage key
 * @param initialValue The initial value to put in storage if no value exists.
 * @param storageType 'local' or 'session'
 */
export const persisted = <T>(
  key: string,
  initialValue: T,
  storageType: 'local' | 'session' = 'local',
): Writable<T> => {
  if (!browser) {
    return writable<T>(initialValue)
  }

  const storage = getStorage(storageType)
  const k = `${prefix}${key}`

  stores[k] ??= createPersisted(k, initialValue, storage)

  return stores[k] as Writable<T>
}

export const setPersistedNamespace = (namespace: string) => {
  prefix = namespace
}
