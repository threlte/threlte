import type { EventListener, XRTargetRaySpace } from 'three'
import { currentWritable, useTask, useThrelte, type Task } from '@threlte/core'
import {
  readButton,
  readHatDirections,
  readStick,
  resolveMapping,
  type GamepadMappings
} from './mappings.js'

type UseGamepadOptions =
  | {
      /** The threshold value of any axis before change events are fired. Default is 0.05. */
      axisDeadzone?: number
      /** An optional gamepad index, if multiple gamepads are used. */
      index?: number
      /**
       * Custom mappings for non-standard controllers, keyed by a `vvvv:pppp`
       * signature (hex USB vendor:product, lowercase) parsed from `Gamepad.id`.
       * Custom entries override the built-in table for the same signature.
       */
      mappings?: GamepadMappings
      /**
       * When `false`, skip the built-in mapping table and only use entries
       * provided via `mappings`. Default `true`.
       */
      useBuiltinMappings?: boolean
      xr?: never
      hand?: never
    }
  | {
      /** The threshold value of any axis before change events are fired. Default is 0.05. */
      axisDeadzone?: number
      xr: true
      hand: 'left' | 'right'
    }

const warnedGamepadIds = new Set<string>()
const warnUnknownGamepad = (id: string): void => {
  if (warnedGamepadIds.has(id)) return
  warnedGamepadIds.add(id)
  console.warn(
    `[threlte useGamepad] Connected gamepad reports a non-standard mapping and ` +
      `no remap is registered for it: "${id}". Button and axis positions may be ` +
      `incorrect. Add a custom mapping via useGamepad({ mappings: { ... } }).`
  )
}

const standardButtons = [
  'clusterBottom',
  'clusterRight',
  'clusterLeft',
  'clusterTop',
  'leftBumper',
  'rightBumper',
  'leftTrigger',
  'rightTrigger',
  'select',
  'start',
  'leftStickButton',
  'rightStickButton',
  'directionalTop',
  'directionalBottom',
  'directionalLeft',
  'directionalRight',
  'center'
] as const

const xrButtons = [
  'trigger',
  'squeeze',
  'touchpadButton',
  'thumbstickButton',
  'clusterBottom',
  'clusterTop'
] as const

const standardAxes = ['leftStick', 'rightStick'] as const
const xrAxes = ['touchpad', 'thumbstick'] as const

type StandardGamepadEvents =
  | 'change'
  | 'press'
  | 'down'
  | 'up'
  | 'touch'
  | 'touchstart'
  | 'touchend'

type StandardGamepadButtons = (typeof standardButtons)[number]
type StandardGamepadAxes = (typeof standardAxes)[number]

type XRGamepadButtons = (typeof xrButtons)[number]
type XRGamepadAxes = (typeof xrAxes)[number]

export type StandardGamepadEvent =
  | {
      type: StandardGamepadEvents
      target: StandardGamepadButtons
      value: number
    }
  | {
      type: StandardGamepadEvents
      target: XRGamepadButtons
      value: number
    }
  | {
      type: 'change'
      target: StandardGamepadAxes
      value: {
        x: number
        y: number
      }
    }
  | {
      type: 'change'
      target: XRGamepadAxes
      value: {
        x: number
        y: number
      }
    }

type Fn = (event: StandardGamepadEvent) => void
type Events = { [K in StandardGamepadEvents]?: Set<Fn> }

class GamepadButtonState {
  pressed = $state(false)
  justPressed = $state(false)
  justReleased = $state(false)
  touched = $state(false)
  value = $state(0)
  on: (name: StandardGamepadEvents, fn: Fn) => () => void
  off: (name: StandardGamepadEvents, fn: Fn) => void

  constructor(events: Events[], index: number) {
    this.off = (name: StandardGamepadEvents, fn: Fn): void => {
      events[index]?.[name]?.delete(fn)
    }

    this.on = (name: StandardGamepadEvents, fn: Fn): (() => void) => {
      events[index][name] ??= new Set()
      events[index][name]!.add(fn)
      return () => {
        this.off(name, fn)
      }
    }
  }
}

class GamepadAxisState {
  x = $state(0)
  y = $state(0)
  on: (name: 'change', fn: Fn) => () => void
  off: (name: 'change', fn: Fn) => void

  constructor(events: Events[], index: number) {
    this.off = (name, fn) => {
      events[index]?.[name]?.delete(fn)
    }
    this.on = (name, fn) => {
      events[index][name] ??= new Set()
      events[index][name]!.add(fn)
      return () => this.off(name, fn)
    }
  }
}

const createButton = (events: Events[], index: number) => new GamepadButtonState(events, index)
const createAxis = (events: Events[], index: number) => new GamepadAxisState(events, index)

const createXrStandard = (allEvents: Events, events: Events[]) => {
  const off = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name]?.delete(fn)
  }

  const on = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name] ??= new Set()
    allEvents[name]!.add(fn)
    return () => off(name, fn)
  }

  const buttons = {
    trigger: createButton(events, 0),
    squeeze: createButton(events, 1),
    touchpadButton: createButton(events, 2),
    thumbstickButton: createButton(events, 3),
    clusterBottom: createButton(events, 4),
    clusterTop: createButton(events, 5)
  }

  const sticks = {
    touchpad: createAxis(events, 6),
    thumbstick: createAxis(events, 7)
  }

  return {
    on,
    off,

    /** The Gamepad connection status */
    connected: currentWritable(false),

    /** The raw Gamepad object */
    raw: null as Gamepad | null,

    /** Get a button by name. */
    button: (name: XRGamepadButtons): GamepadButtonState => {
      const btn = buttons[name]
      if (!btn) throw new Error(`Unknown XR gamepad button: "${name}"`)
      return btn
    },

    /** Get a stick by name. */
    stick: (name: XRGamepadAxes): GamepadAxisState => {
      const s = sticks[name]
      if (!s) throw new Error(`Unknown XR gamepad stick: "${name}"`)
      return s
    },

    /** @deprecated Use `button('trigger')` instead */
    trigger: buttons.trigger,
    /** @deprecated Use `button('squeeze')` instead */
    squeeze: buttons.squeeze,
    /** @deprecated Use `button('touchpadButton')` instead */
    touchpadButton: buttons.touchpadButton,
    /** @deprecated Use `button('thumbstickButton')` instead */
    thumbstickButton: buttons.thumbstickButton,
    /** @deprecated Use `button('clusterBottom')` instead */
    clusterBottom: buttons.clusterBottom,
    /** @deprecated Use `button('clusterTop')` instead */
    clusterTop: buttons.clusterTop,

    /** @deprecated Use `stick('touchpad')` instead */
    touchpad: sticks.touchpad,
    /** @deprecated Use `stick('thumbstick')` instead */
    thumbstick: sticks.thumbstick
  }
}

const createStandard = (allEvents: Events, events: Events[]) => {
  const off = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name]?.delete(fn)
  }

  const on = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name] ??= new Set()
    allEvents[name]!.add(fn)
    return () => off(name, fn)
  }

  const buttons = {
    clusterBottom: createButton(events, 0),
    clusterRight: createButton(events, 1),
    clusterLeft: createButton(events, 2),
    clusterTop: createButton(events, 3),
    leftBumper: createButton(events, 4),
    rightBumper: createButton(events, 5),
    leftTrigger: createButton(events, 6),
    rightTrigger: createButton(events, 7),
    select: createButton(events, 8),
    start: createButton(events, 9),
    leftStickButton: createButton(events, 10),
    rightStickButton: createButton(events, 11),
    directionalTop: createButton(events, 12),
    directionalBottom: createButton(events, 13),
    directionalLeft: createButton(events, 14),
    directionalRight: createButton(events, 15),
    center: createButton(events, 16)
  }

  const sticks = {
    leftStick: createAxis(events, 17),
    rightStick: createAxis(events, 18)
  }

  return {
    on,
    off,

    /** The Gamepad connection status */
    connected: currentWritable(false),

    /** The raw Gamepad object */
    raw: null as Gamepad | null,

    /** Get a button by name. */
    button: (name: StandardGamepadButtons): GamepadButtonState => {
      const btn = buttons[name]
      if (!btn) throw new Error(`Unknown gamepad button: "${name}"`)
      return btn
    },

    /** Get a stick by name. */
    stick: (name: StandardGamepadAxes): GamepadAxisState => {
      const s = sticks[name]
      if (!s) throw new Error(`Unknown gamepad stick: "${name}"`)
      return s
    },

    /** @deprecated Use `button('clusterBottom')` instead */
    clusterBottom: buttons.clusterBottom,
    /** @deprecated Use `button('clusterRight')` instead */
    clusterRight: buttons.clusterRight,
    /** @deprecated Use `button('clusterLeft')` instead */
    clusterLeft: buttons.clusterLeft,
    /** @deprecated Use `button('clusterTop')` instead */
    clusterTop: buttons.clusterTop,
    /** @deprecated Use `button('leftBumper')` instead */
    leftBumper: buttons.leftBumper,
    /** @deprecated Use `button('rightBumper')` instead */
    rightBumper: buttons.rightBumper,
    /** @deprecated Use `button('leftTrigger')` instead */
    leftTrigger: buttons.leftTrigger,
    /** @deprecated Use `button('rightTrigger')` instead */
    rightTrigger: buttons.rightTrigger,
    /** @deprecated Use `button('select')` instead */
    select: buttons.select,
    /** @deprecated Use `button('start')` instead */
    start: buttons.start,
    /** @deprecated Use `button('leftStickButton')` instead */
    leftStickButton: buttons.leftStickButton,
    /** @deprecated Use `button('rightStickButton')` instead */
    rightStickButton: buttons.rightStickButton,
    /** @deprecated Use `button('directionalTop')` instead */
    directionalTop: buttons.directionalTop,
    /** @deprecated Use `button('directionalBottom')` instead */
    directionalBottom: buttons.directionalBottom,
    /** @deprecated Use `button('directionalLeft')` instead */
    directionalLeft: buttons.directionalLeft,
    /** @deprecated Use `button('directionalRight')` instead */
    directionalRight: buttons.directionalRight,
    /** @deprecated Use `button('center')` instead */
    center: buttons.center,

    /** @deprecated Use `stick('leftStick')` instead */
    leftStick: sticks.leftStick,
    /** @deprecated Use `stick('rightStick')` instead */
    rightStick: sticks.rightStick
  }
}

const processButton = (
  target: StandardGamepadButtons | XRGamepadButtons,
  mappedButton: StandardGamepadButton,
  allEvents: Events,
  buttonEvents: Events,
  source?: GamepadButton
) => {
  // Clear last frame's transient states
  if (mappedButton.justPressed) mappedButton.justPressed = false
  if (mappedButton.justReleased) mappedButton.justReleased = false

  const lastTouched = mappedButton.touched
  const lastPressed = mappedButton.pressed
  const lastValue = mappedButton.value

  mappedButton.touched = source?.touched ?? false
  mappedButton.pressed = source?.pressed ?? false
  const value = (mappedButton.value = source?.value ?? 0)

  if (!lastTouched && mappedButton.touched) {
    allEvents.touchstart?.forEach((fn) => fn({ type: 'touchstart', target, value }))
    buttonEvents.touchstart?.forEach((fn) => fn({ type: 'touchstart', target, value }))
  } else if (lastTouched && !mappedButton.touched) {
    allEvents.touch?.forEach((fn) => fn({ type: 'touch', target, value }))
    buttonEvents.touch?.forEach((fn) => fn({ type: 'touch', target, value }))
    allEvents.touchend?.forEach((fn) => fn({ type: 'touchend', target, value }))
    buttonEvents.touchend?.forEach((fn) => fn({ type: 'touchend', target, value }))
  }

  if (!lastPressed && mappedButton.pressed) {
    mappedButton.justPressed = true
    allEvents.down?.forEach((fn) => fn({ type: 'down', target, value }))
    buttonEvents.down?.forEach((fn) => fn({ type: 'down', target, value }))
  } else if (lastPressed && !mappedButton.pressed) {
    mappedButton.justReleased = true
    allEvents.press?.forEach((fn) => fn({ type: 'press', target, value }))
    buttonEvents.press?.forEach((fn) => fn({ type: 'press', target, value }))
    allEvents.up?.forEach((fn) => fn({ type: 'up', target, value }))
    buttonEvents.up?.forEach((fn) => fn({ type: 'up', target, value }))
  }

  if (lastValue !== mappedButton.value) {
    allEvents.change?.forEach((fn) => fn({ type: 'change', target, value }))
    buttonEvents.change?.forEach((fn) => fn({ type: 'change', target, value }))
  }
}

const processAxis = (
  target: StandardGamepadAxes | XRGamepadAxes,
  mappedStick: StandardGamepadStick,
  allEvents: Events,
  axisEvents: Events,
  axisDeadzone: number,
  rawX = 0,
  rawY = 0
) => {
  const lastValueX = mappedStick.x
  const lastValueY = mappedStick.y

  const x = Math.abs(rawX) < axisDeadzone ? 0 : rawX
  const y = Math.abs(rawY) < axisDeadzone ? 0 : rawY

  mappedStick.x = x
  mappedStick.y = y

  if (lastValueX !== x || lastValueY !== y) {
    allEvents.change?.forEach((fn) => fn({ type: 'change', target, value: { x, y } }))
    axisEvents.change?.forEach((fn) => fn({ type: 'change', target, value: { x, y } }))
  }
}

type StandardGamepadButton = ReturnType<typeof createButton>
type StandardGamepadStick = ReturnType<typeof createAxis>
export type StandardGamepad = ReturnType<typeof createStandard> & { task: Task }
export type StandardXRGamepad = ReturnType<typeof createXrStandard> & { task: Task }

export function useGamepad(): StandardGamepad
export function useGamepad(options: UseGamepadOptions & { xr?: never }): StandardGamepad
export function useGamepad(options: UseGamepadOptions & { xr: true }): StandardXRGamepad
export function useGamepad(options: UseGamepadOptions = {}): StandardGamepad | StandardXRGamepad {
  const { axisDeadzone = 0.05 } = options
  const allEvents: Events = {}
  const events: Events[] = []

  if ('xr' in options) {
    for (let i = 0; i < xrButtons.length + xrAxes.length; i += 1) {
      events.push({})
    }

    const gamepad = createXrStandard(allEvents, events)
    const { xr } = useThrelte().renderer

    const processSnapshot = () => {
      xr.getSession()?.inputSources.forEach((source) => {
        if (source.handedness !== options.hand) {
          return
        }

        gamepad.raw = source.gamepad ?? null

        const { buttons = [], axes = [] } = gamepad.raw ?? {}

        xrButtons.forEach((name, index) =>
          processButton(name, gamepad[name], allEvents, events[index], buttons[index])
        )

        processAxis(
          'touchpad',
          gamepad.stick('touchpad'),
          allEvents,
          events[6],
          axisDeadzone,
          axes[0],
          axes[1]
        )
        processAxis(
          'thumbstick',
          gamepad.stick('thumbstick'),
          allEvents,
          events[7],
          axisDeadzone,
          axes[2],
          axes[3]
        )
      })
    }

    let running = $state(false)

    const { task } = useTask(Symbol('useGamepad'), processSnapshot, {
      autoInvalidate: false,
      running: () => running
    })

    const handleConnected: EventListener<
      {
        data: XRInputSource
      },
      'connected',
      XRTargetRaySpace
    > = (event) => {
      if (event.data.handedness !== options.hand) return

      const pad = event.data.gamepad

      if (pad) {
        gamepad.raw = pad
        gamepad.connected.set(true)
        running = true
      }
    }

    const handleDisconnected: EventListener<
      {
        data: XRInputSource
      },
      'disconnected',
      XRTargetRaySpace
    > = (event) => {
      if (event.data.handedness !== options.hand) return

      gamepad.raw = null
      gamepad.connected.set(false)
      running = false
    }

    // Check if gamepads are already connected. Since XR controllers do not show
    // up in the regular navigator.getGamepads() array, we have to check the
    // XRSession's inputSources array.
    const session = xr.getSession()
    if (session) {
      session.inputSources.forEach((source) => {
        if (source.handedness !== options.hand) {
          return
        }

        const pad = source.gamepad
        // we could be dealing with hands here, so we need to check if the gamepad is null
        if (pad) {
          gamepad.raw = pad
          gamepad.connected.set(true)
          running = true
        }
      })
    }

    $effect(() => {
      for (const index of [0, 1]) {
        const controller = xr.getController(index)
        controller.addEventListener('connected', handleConnected)
        controller.addEventListener('disconnected', handleDisconnected)
      }

      return () => {
        for (const index of [0, 1]) {
          const controller = xr.getController(index)
          controller.removeEventListener('connected', handleConnected)
          controller.removeEventListener('disconnected', handleDisconnected)
        }
      }
    })

    return Object.assign(gamepad, { task })
  } else {
    for (let i = 0; i < standardButtons.length + standardAxes.length; i += 1) {
      events.push({})
    }

    const { index: gamepadIndex = 0, mappings: userMappings, useBuiltinMappings = true } = options
    const gamepad = createStandard(allEvents, events)

    // Cache the resolved remap per-pad so the lookup only runs when the
    // connected controller's id changes (e.g. user swaps gamepads).
    let cachedMappingForId: string | null = null
    let cachedMapping: ReturnType<typeof resolveMapping> = null

    const processSnapshot = () => {
      /**
       * getGamepads() will return a snapshot of a gamepad that will never change,
       * so it must be polled continuously to receive new values.
       */
      const pad = navigator.getGamepads()[gamepadIndex]
      gamepad.raw = pad

      if (!pad) {
        // Clear transient button/axis state by feeding empty sources.
        for (let i = 0; i < standardButtons.length; i += 1) {
          processButton(standardButtons[i], gamepad[standardButtons[i]], allEvents, events[i])
        }
        processAxis('leftStick', gamepad.leftStick, allEvents, events[17], axisDeadzone, 0, 0)
        processAxis('rightStick', gamepad.rightStick, allEvents, events[18], axisDeadzone, 0, 0)
        return
      }

      if (pad.id !== cachedMappingForId) {
        cachedMappingForId = pad.id
        cachedMapping = resolveMapping(pad, userMappings, useBuiltinMappings)
        if (pad.mapping !== 'standard' && !cachedMapping) {
          warnUnknownGamepad(pad.id)
        }
      }

      const mapping = cachedMapping
      const hatDirs = mapping?.dpad ? readHatDirections(pad, mapping.dpad) : undefined

      for (let i = 0; i < standardButtons.length; i += 1) {
        const name = standardButtons[i]
        let source: GamepadButton | undefined

        if (
          hatDirs &&
          (name === 'directionalTop' ||
            name === 'directionalRight' ||
            name === 'directionalBottom' ||
            name === 'directionalLeft')
        ) {
          const pressed =
            name === 'directionalTop'
              ? hatDirs.up
              : name === 'directionalRight'
                ? hatDirs.right
                : name === 'directionalBottom'
                  ? hatDirs.down
                  : hatDirs.left
          source = { pressed, touched: pressed, value: pressed ? 1 : 0 }
        } else {
          source = readButton(pad, mapping?.buttons?.[name], i)
        }

        processButton(name, gamepad[name], allEvents, events[i], source)
      }

      const leftStickVals = readStick(pad, mapping?.leftStick, 0, 1)
      const rightStickVals = readStick(pad, mapping?.rightStick, 2, 3)

      processAxis(
        'leftStick',
        gamepad.stick('leftStick'),
        allEvents,
        events[17],
        axisDeadzone,
        leftStickVals.x,
        leftStickVals.y
      )
      processAxis(
        'rightStick',
        gamepad.stick('rightStick'),
        allEvents,
        events[18],
        axisDeadzone,
        rightStickVals.x,
        rightStickVals.y
      )
    }

    let running = $state(false)

    const { task } = useTask(Symbol('useGamepad'), processSnapshot, {
      autoInvalidate: false,
      running: () => running
    })

    const handleGamepadDisconnected = (event: GamepadEvent): void => {
      const { id } = event.gamepad

      if (id === gamepad.raw?.id) {
        gamepad.raw = null
        gamepad.connected.set(false)
        running = false
      }
    }

    const handleGamepadConnected = (): void => {
      const pad = navigator.getGamepads()[gamepadIndex]

      if (pad) {
        gamepad.raw = pad
        gamepad.connected.set(true)
        running = true
      }
    }

    // Check if gamepads are already connected.
    handleGamepadConnected()

    $effect.pre(() => {
      window.addEventListener('gamepadconnected', handleGamepadConnected)
      window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

      return () => {
        window.removeEventListener('gamepadconnected', handleGamepadConnected)
        window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
      }
    })

    return Object.assign(gamepad, { task })
  }
}
