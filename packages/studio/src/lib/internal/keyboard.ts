import { currentWritable } from '@threlte/core'
import { onMount } from 'svelte'

const metaKeys = new Set(['ctrl', 'alt', 'shift', 'meta'])

const keyDelimiter = '§§§'

const ignoreInputOnActiveElementTagNames = ['INPUT', 'TEXTAREA', 'SELECT']

/**
 * Creates a string representation from an array of keyboard keys with a
 * delimiter that is unlikely to be used in a keyboard shortcut. Flattened
 * representations can be used to easily compare keyboard presses against a
 * map of shortcuts.
 *
 * @example
 * ```ts
 * const keys = ['cmd', 'shift', 'a']
 * const flattenedKeyCombo = flattenKeyCombo(keys)
 * console.log(flattenedKeyCombo) // 'cmd§§§shift§§§a'
 * ```
 */
export const flattenKeyCombo = (keyCombo: string[] | string) => {
  if (!Array.isArray(keyCombo)) return keyCombo
  const metaKeysArray = keyCombo.filter((k) => metaKeys.has(k)).toSorted()
  const otherKeysArray = keyCombo.filter((k) => !metaKeys.has(k)).toSorted()
  return [...metaKeysArray, ...otherKeysArray].join(keyDelimiter)
}

const makeHotkeyFn = (hotkey: string): ((key?: string | string[]) => string[]) => {
  return (key?: string | string[]) => {
    const keys = key === undefined ? [] : Array.isArray(key) ? key : [key]
    if (hotkey) keys.push(hotkey)
    return keys
  }
}

export const hotkeyFns = {
  ctrl: makeHotkeyFn('ctrl'),
  alt: makeHotkeyFn('alt'),
  shift: makeHotkeyFn('shift'),
  meta: makeHotkeyFn('meta')
}

export const formatKeyCombo = (keyCombo: string): string => {
  return keyCombo.split(keyDelimiter).join('+')
}

export const createKeyboardControls = (runAction: (scope: string, actionId: string) => void) => {
  const enabled = currentWritable(true)

  const downKeyMap = currentWritable<Map<string, { scope: string; actionId: string }>>(new Map())
  const upKeyMap = currentWritable<Map<string, { scope: string; actionId: string }>>(new Map())

  const addKeys = (
    scope: string,
    keyMapItems: Record<
      string,
      string | string[] | undefined | { up?: string | string[]; down?: string | string[] }
    >
  ) => {
    const updateKeyMap = (keyMap: typeof downKeyMap, keyCombos: Map<string, string>) => {
      keyMap.update((k) => {
        for (const [keyCombo, actionId] of keyCombos.entries()) {
          if (k.has(keyCombo)) {
            const action = k.get(keyCombo)
            const formattedKeyCombo = formatKeyCombo(keyCombo)
            console.warn(
              `"${formattedKeyCombo}" is already used by action "${action?.scope}:${action?.actionId}", skipping …"`
            )
          } else {
            k.set(keyCombo, {
              scope,
              actionId
            })
          }
        }
        return k
      })
    }

    const upKeyCombos = new Map<string, string>()
    const downKeyCombos = new Map<string, string>()

    for (const [actionId, keyOrKeyCombo] of Object.entries(keyMapItems)) {
      if (!keyOrKeyCombo) continue
      if (typeof keyOrKeyCombo === 'object' && !Array.isArray(keyOrKeyCombo)) {
        // object, so it's an up and/or down key
        const { up, down } = keyOrKeyCombo

        if (up) {
          const flattenedUp = flattenKeyCombo(up)
          upKeyCombos.set(flattenedUp, actionId)
        }

        if (down) {
          const flattenedDown = flattenKeyCombo(down)
          downKeyCombos.set(flattenedDown, actionId)
        }
      } else {
        // string or string[], so it's a down key automatically
        const flattenedKeyCombo = flattenKeyCombo(keyOrKeyCombo)
        downKeyCombos.set(flattenedKeyCombo, actionId)
      }
    }

    updateKeyMap(downKeyMap, downKeyCombos)
    updateKeyMap(upKeyMap, upKeyCombos)
  }

  const removeKeys = (scope: string) => {
    downKeyMap.update((k) => {
      for (const [keys, { scope: s }] of k.entries()) {
        if (s === scope) {
          k.delete(keys)
        }
      }
      return k
    })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!enabled.current) return

    const keys = []

    const MetaKeys = ['Meta', 'Control', 'Alt', 'Shift']
    if (!MetaKeys.includes(e.key)) {
      const meta = e.metaKey
      if (meta) keys.push('meta')
      const ctrl = e.ctrlKey
      if (ctrl) keys.push('ctrl')
      const alt = e.altKey
      if (alt) keys.push('alt')
      const shift = e.shiftKey
      if (shift) keys.push('shift')
    }

    if (e.code.startsWith('Key')) {
      keys.push(e.code.replace('Key', '').toLowerCase())
    } else {
      keys.push(e.key.toLowerCase())
    }

    // Ignore keyboard actions if the active element is an input and keys array
    // does not include 'meta' or 'ctrl'
    checkActiveElement: if (!keys.includes('meta') && !keys.includes('ctrl')) {
      const activeElement = document.activeElement
      if (!activeElement) break checkActiveElement
      const tagName = activeElement.tagName.toUpperCase()
      if (activeElement && ignoreInputOnActiveElementTagNames.includes(tagName)) return
    }

    const flattenedKeyCombo = flattenKeyCombo(keys)
    if (downKeyMap.current.has(flattenedKeyCombo)) {
      e.preventDefault()
      const action = downKeyMap.current.get(flattenedKeyCombo)
      if (!action) return
      // no need to await here
      runAction(action.scope, action.actionId)
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (!enabled.current) return

    const keys = []

    const MetaKeys = ['Meta', 'Control', 'Alt', 'Shift']
    if (!MetaKeys.includes(e.key)) {
      const meta = e.metaKey
      if (meta) keys.push('meta')
      const ctrl = e.ctrlKey
      if (ctrl) keys.push('ctrl')
      const alt = e.altKey
      if (alt) keys.push('alt')
      const shift = e.shiftKey
      if (shift) keys.push('shift')
    }

    keys.push(e.key.toLowerCase())

    const flattenedKeyCombo = flattenKeyCombo(keys)
    if (upKeyMap.current.has(flattenedKeyCombo)) {
      e.preventDefault()
      const action = upKeyMap.current.get(flattenedKeyCombo)
      if (!action) return
      // no need to await here
      runAction(action.scope, action.actionId)
    }
  }

  onMount(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  })

  return {
    removeKeys,
    addKeys,
    enabled
  }
}
