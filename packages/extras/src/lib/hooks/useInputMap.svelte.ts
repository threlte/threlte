import { useTask } from '@threlte/core'
import type { UseKeyboardReturn } from './useKeyboard.svelte.js'
import type { StandardGamepad, StandardXRGamepad } from './useGamepad/useGamepad.svelte.js'

type GamepadButtonName =
  | Parameters<StandardGamepad['button']>[0]
  | Parameters<StandardXRGamepad['button']>[0]

type GamepadStickName =
  | Parameters<StandardGamepad['stick']>[0]
  | Parameters<StandardXRGamepad['stick']>[0]

interface KeyboardBinding {
  type: 'keyboard'
  key: string
}

interface GamepadButtonBinding {
  type: 'gamepadButton'
  button: GamepadButtonName
}

interface GamepadAxisBinding {
  type: 'gamepadAxis'
  stick: GamepadStickName
  axis: 'x' | 'y'
  direction: 1 | -1
  threshold: number
}

type Binding = KeyboardBinding | GamepadButtonBinding | GamepadAxisBinding

class ActionState {
  /** Whether any binding for this action is currently active */
  pressed = $state(false)
  /** Whether this action became active this frame */
  justPressed = $state(false)
  /** Whether this action became inactive this frame */
  justReleased = $state(false)
  /** Analog strength 0–1. Digital bindings produce 0 or 1. */
  strength = $state(0)
}

type ActionDefinitions = Record<string, Binding[]>

interface UseInputMapOptions {
  /** A `useKeyboard` instance for resolving keyboard bindings. */
  keyboard: UseKeyboardReturn
  /**
   * A gamepad returned by `useGamepad()`. Required only if any action uses
   * `useInputMap.gamepadButton()` or `useInputMap.gamepadAxis()` bindings.
   */
  gamepad?: StandardGamepad | StandardXRGamepad
}

const bindingHelpers = {
  /** Bind a keyboard key by its `KeyboardEvent.key` value. Matching is case-insensitive. */
  key: (key: string): KeyboardBinding => ({
    type: 'keyboard',
    key
  }),
  /** Bind a standard gamepad button (e.g. `'clusterBottom'`, `'leftTrigger'`). */
  gamepadButton: (button: GamepadButtonName): GamepadButtonBinding => ({
    type: 'gamepadButton',
    button
  }),
  /**
   * Bind a gamepad stick axis.
   *
   * ```ts
   * gamepadAxis('leftStick', 'x', 1)   // right on the left stick
   * gamepadAxis('leftStick', 'y', -1)  // up on the left stick
   * ```
   */
  gamepadAxis: (
    stick: GamepadStickName,
    axis: 'x' | 'y',
    direction: 1 | -1,
    threshold = 0.1
  ): GamepadAxisBinding => ({
    type: 'gamepadAxis',
    stick,
    axis,
    direction,
    threshold
  })
} as const

export type BindingHelpers = typeof bindingHelpers

export function useInputMap<T extends ActionDefinitions>(
  definitionsFn: (map: BindingHelpers) => T,
  options: UseInputMapOptions
) {
  type ActionName = keyof T & string

  const keyboard = options.keyboard
  const gamepad = options.gamepad

  let _activeDevice: 'keyboard' | 'gamepad' = $state('keyboard')

  const actionStates = new Map<string, ActionState>()
  const previousPressed = new Map<string, boolean>()

  // Eagerly create action states so they're available before the first frame
  for (const name of Object.keys(definitionsFn(bindingHelpers))) {
    actionStates.set(name, new ActionState())
    previousPressed.set(name, false)
  }

  /** Resolve a single binding to its current strength (0–1). */
  const getBindingStrength = (binding: Binding): number => {
    switch (binding.type) {
      case 'keyboard': {
        return keyboard.key(binding.key).pressed ? 1 : 0
      }
      case 'gamepadButton': {
        if (!gamepad) return 0
        const btn = (gamepad as any)[binding.button]
        if (!btn) return 0
        return btn.value ?? (btn.pressed ? 1 : 0)
      }
      case 'gamepadAxis': {
        if (!gamepad) return 0
        const stick = (gamepad as any)[binding.stick]
        if (!stick) return 0
        const raw = stick[binding.axis] ?? 0
        const directed = raw * binding.direction
        return directed > binding.threshold ? directed : 0
      }
    }
  }

  const getOrCreateState = (name: string): ActionState => {
    let state = actionStates.get(name)
    if (!state) {
      state = new ActionState()
      actionStates.set(name, state)
      previousPressed.set(name, false)
    }
    return state
  }

  /**
   * Process all action states once per frame, after the keyboard task
   * has finished processing its buffered events. The definitions function
   * is called each frame so reactive dependencies are picked up.
   */
  const { task } = useTask(
    'useInputMap',
    () => {
      const actions = definitionsFn(bindingHelpers)

      for (const [name, bindings] of Object.entries(actions) as [ActionName, Binding[]][]) {
        const state = getOrCreateState(name)

        let maxStrength = 0
        for (const binding of bindings) {
          const s = getBindingStrength(binding)
          if (s > maxStrength) {
            maxStrength = s
            _activeDevice = binding.type === 'keyboard' ? 'keyboard' : 'gamepad'
          }
        }

        const wasPressed = previousPressed.get(name)!
        const isPressed = maxStrength > 0

        state.strength = maxStrength
        state.pressed = isPressed
        state.justPressed = isPressed && !wasPressed
        state.justReleased = !isPressed && wasPressed

        previousPressed.set(name, isPressed)
      }
    },
    { after: keyboard.task, autoInvalidate: false }
  )

  /** Get the current state of a named action. */
  const action = (name: ActionName): ActionState => {
    const state = actionStates.get(name)
    if (!state) {
      throw new Error(`Unknown action: "${name}"`)
    }
    return state
  }

  /**
   * Get a signed axis value from two opposing actions.
   * Returns a value from –1 (negative fully active) to 1 (positive fully active).
   */
  const axis = (negative: ActionName, positive: ActionName): number => {
    return action(positive).strength - action(negative).strength
  }

  /**
   * Get a 2D vector from four directional actions.
   * The result is clamped to a unit circle (magnitude ≤ 1).
   */
  const vec = { x: 0, y: 0 }
  const vector = (
    negativeX: ActionName,
    positiveX: ActionName,
    negativeY: ActionName,
    positiveY: ActionName
  ): { x: number; y: number } => {
    vec.x = axis(negativeX, positiveX)
    vec.y = axis(negativeY, positiveY)

    const lengthSq = vec.x * vec.x + vec.y * vec.y
    if (lengthSq > 1) {
      const length = Math.sqrt(lengthSq)
      vec.x /= length
      vec.y /= length
    }

    return vec
  }

  return {
    /** The internal task, for ordering other tasks via `after`/`before`. */
    task,
    /** The most recently active input device. Switches when a new device provides input. */
    activeDevice: {
      get current() {
        return _activeDevice
      }
    },
    action,
    axis,
    vector
  }
}

export type UseInputMapReturn = ReturnType<typeof useInputMap>
