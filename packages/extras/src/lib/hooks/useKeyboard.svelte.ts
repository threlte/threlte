import { useTask } from '@threlte/core'

export class KeyState {
  /** Whether the key is currently held down */
  pressed = $state(false)
  /** Whether the key was first pressed this frame */
  justPressed = $state(false)
  /** Whether the key was released this frame */
  justReleased = $state(false)
}

export interface UseKeyboardOptions {
  /**
   * The target element to listen for keyboard events on.
   * @default window
   */
  target?: EventTarget
}

type KeyboardEventType = 'keydown' | 'keyup'
type KeyboardEventHandler = (event: KeyboardEvent) => void

/**
 * Normalize a key name to lowercase for case-insensitive matching.
 * This ensures that Shift+W ('W') still matches a binding for 'w'.
 * 'Space' is aliased to ' ' so users don't have to remember the literal space.
 */
const normalize = (key: string) => {
  const k = key.toLowerCase()
  return k === 'space' ? ' ' : k
}

export const useKeyboard = (optionsFn?: () => UseKeyboardOptions) => {
  const keys = new Map<string, KeyState>()
  const pendingDown = new Set<string>()
  const pendingUp = new Set<string>()

  const listeners: Record<KeyboardEventType, Set<KeyboardEventHandler>> = {
    keydown: new Set(),
    keyup: new Set()
  }

  const getKey = (key: string): KeyState => {
    const k = normalize(key)
    let keyState = keys.get(k)
    if (!keyState) {
      keyState = new KeyState()
      keys.set(k, keyState)
    }
    return keyState
  }

  const handleKeyDown = (event: Event) => {
    const e = event as KeyboardEvent
    for (const fn of listeners.keydown) fn(e)
    if (e.repeat) return
    pendingDown.add(normalize(e.key))
  }

  const handleKeyUp = (event: Event) => {
    const e = event as KeyboardEvent
    pendingUp.add(normalize(e.key))
    for (const fn of listeners.keyup) fn(e)
  }

  const handleBlur = () => {
    // Release all pressed keys when the window loses focus
    for (const [key, state] of keys) {
      if (state.pressed) {
        pendingUp.add(key)
      }
    }
  }

  /**
   * Processes buffered keyboard events once per frame.
   * justPressed/justReleased persist for the entire frame, then are
   * cleared at the start of the next frame before new events are applied.
   */
  const { task } = useTask(
    'useKeyboard',
    () => {
      // Clear last frame's transient states
      for (const [, state] of keys) {
        if (state.justPressed) state.justPressed = false
        if (state.justReleased) state.justReleased = false
      }

      // Process pending key-down events
      for (const key of pendingDown) {
        const state = getKey(key)
        if (!state.pressed) {
          state.pressed = true
          state.justPressed = true
        }
      }
      pendingDown.clear()

      // Process pending key-up events
      for (const key of pendingUp) {
        const state = getKey(key)
        if (state.pressed) {
          state.pressed = false
          state.justReleased = true
          // If pressed and released in the same frame, don't report justPressed
          state.justPressed = false
        }
      }
      pendingUp.clear()
    },
    { autoInvalidate: false }
  )

  $effect.pre(() => {
    const { target = window } = optionsFn?.() ?? {}

    target.addEventListener('keydown', handleKeyDown)
    target.addEventListener('keyup', handleKeyUp)
    target.addEventListener('blur', handleBlur)

    return () => {
      target.removeEventListener('keydown', handleKeyDown)
      target.removeEventListener('keyup', handleKeyUp)
      target.removeEventListener('blur', handleBlur)
    }
  })

  const on = (event: KeyboardEventType, fn: KeyboardEventHandler) => {
    listeners[event].add(fn)
    return () => {
      listeners[event].delete(fn)
    }
  }

  return {
    /**
     * The internal task, exposed for ordering other tasks relative to
     * keyboard processing via `useTask('myTask', fn, { after: keyboard.task })`.
     */
    task,

    /**
     * Get the state of a key by its `KeyboardEvent.key` value
     * (e.g. `'w'`, `'Space'`, `'ArrowUp'`, `'Shift'`).
     * Matching is case-insensitive.
     */
    key: getKey,

    /**
     * Register an event listener. Returns a cleanup function.
     *
     * ```ts
     * const off = keyboard.on('keydown', (e) => console.log(e.key))
     * // later: off()
     * ```
     */
    on
  }
}

export type UseKeyboardReturn = ReturnType<typeof useKeyboard>
