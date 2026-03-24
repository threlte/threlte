import type { EventListener, XRTargetRaySpace } from 'three'
import { currentWritable, useTask, useThrelte } from '@threlte/core'

type UseGamepadOptions =
  | {
      /** The threshold value of any axis before change events are fired. Default is 0.05. */
      axisDeadzone?: number
      /** An optional gamepad index, if multiple gamepads are used. */
      index?: number
      xr?: never
      hand?: never
    }
  | {
      /** The threshold value of any axis before change events are fired. Default is 0.05. */
      axisDeadzone?: number
      xr: true
      hand: 'left' | 'right'
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
type Events = { [K in StandardGamepadEvents]?: Fn[] }

const createButton = (events: Events[], index: number) => {
  const off = (name: StandardGamepadEvents, fn: Fn) => {
    if (!(index in events) || !(name in events[index])) return
    const arrayIndex = events[index][name]!.indexOf(fn)
    if (arrayIndex > -1) events[index][name]!.splice(arrayIndex, 1)
  }

  const on = (name: StandardGamepadEvents, fn: Fn) => {
    events[index][name] ??= []
    events[index][name]!.push(fn)
    return () => off(name, fn)
  }

  return {
    pressed: false,
    touched: false,
    value: 0,
    on,
    off
  }
}

const createAxis = (events: Events[], index: number) => {
  const off = (name: 'change', fn: Fn) => {
    if (!(index in events) || !(name in events[index])) return
    const arrayIndex = events[index][name]!.indexOf(fn)
    if (arrayIndex > -1) events[index][name]!.splice(arrayIndex, 1)
  }

  const on = (name: 'change', fn: Fn) => {
    events[index][name] ??= []
    events[index][name]!.push(fn)
    return () => off(name, fn)
  }

  return {
    x: 0,
    y: 0,
    on,
    off
  }
}

const createXrStandard = (allEvents: Events, events: Events[]) => {
  const off = (name: StandardGamepadEvents, fn: Fn) => {
    if (!allEvents[name]) return
    const index = allEvents[name]!.indexOf(fn)
    if (index > -1) allEvents[name]!.splice(index, 1)
  }

  const on = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name] ??= []
    allEvents[name]!.push(fn)
    return () => off(name, fn)
  }

  return {
    on,
    off,

    /** The Gamepad connection status */
    connected: currentWritable(false),

    /** The raw Gamepad object */
    raw: null as Gamepad | null,

    /** buttons[0] - Primary trigger */
    trigger: createButton(events, 0),
    /** buttons[1] - Primary squeeze button */
    squeeze: createButton(events, 1),
    /** buttons[2] - Primary touchpad */
    touchpadButton: createButton(events, 2),
    /** buttons[3] - Primary thumbstick */
    thumbstickButton: createButton(events, 3),
    /** buttons[4] - Bottom cluster button */
    clusterBottom: createButton(events, 4),
    /** buttons[5] - Top cluster button */
    clusterTop: createButton(events, 5),

    /** axes[0], axes[1] - Horizontal / vertical axis for the primary touchpad */
    touchpad: createAxis(events, 6),
    /** axes[2], axes[3] - Horizontal / vertical axis for the primary thumbstick */
    thumbstick: createAxis(events, 7)
  }
}

const createStandard = (allEvents: Events, events: Events[]) => {
  const off = (name: StandardGamepadEvents, fn: Fn) => {
    if (!allEvents[name]) return
    const index = allEvents[name]!.indexOf(fn)
    if (index > -1) allEvents[name]!.splice(index, 1)
  }

  const on = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name] ??= []
    allEvents[name]!.push(fn)
    return () => off(name, fn)
  }

  return {
    on,
    off,

    /** The Gamepad connection status */
    connected: currentWritable(false),

    /** The raw Gamepad object */
    raw: null as Gamepad | null,

    /** buttons[0] - Botton button in right cluster */
    clusterBottom: createButton(events, 0),
    /** buttons[1] - Right button in right cluster */
    clusterRight: createButton(events, 1),
    /** buttons[2] - Left button in right cluster */
    clusterLeft: createButton(events, 2),
    /** buttons[3] - Top button in right cluster */
    clusterTop: createButton(events, 3),
    /** buttons[4] - Top left front button */
    leftBumper: createButton(events, 4),
    /** buttons[5] - Top right front button */
    rightBumper: createButton(events, 5),
    /** buttons[6] - Bottom left front button */
    leftTrigger: createButton(events, 6),
    /** buttons[7] - Bottom right front button */
    rightTrigger: createButton(events, 7),
    /** buttons[8] - Left button in center cluster */
    select: createButton(events, 8),
    /** buttons[9] - Right button in center cluster */
    start: createButton(events, 9),
    /** buttons[10] - Left stick pressed button */
    leftStickButton: createButton(events, 10),
    /** buttons[11] -	Right stick pressed button */
    rightStickButton: createButton(events, 11),
    /** buttons[12] -	Top button in left cluster */
    directionalTop: createButton(events, 12),
    /** buttons[13] -	Bottom button in left cluster */
    directionalBottom: createButton(events, 13),
    /** buttons[14] -	Left button in left cluster */
    directionalLeft: createButton(events, 14),
    /** buttons[15] -	Right button in left cluster */
    directionalRight: createButton(events, 15),
    /** buttons[16] -	Center button in center cluster */
    center: createButton(events, 16),

    /** axes[0], axes[1] - Horizontal / vertical axis for left stick (negative left/positive right) */
    leftStick: createAxis(events, 17),
    /** axes[2], axes[3] - Horizontal / vertical axis for right stick (negative left/positive right) */
    rightStick: createAxis(events, 18)
  }
}

const processButton = (
  target: StandardGamepadButtons | XRGamepadButtons,
  mappedButton: StandardGamepadButton,
  allEvents: Events,
  buttonEvents: Events,
  source?: GamepadButton
) => {
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
    allEvents.down?.forEach((fn) => fn({ type: 'down', target, value }))
    buttonEvents.down?.forEach((fn) => fn({ type: 'down', target, value }))
  } else if (lastPressed && !mappedButton.pressed) {
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
type StandardGamepad = ReturnType<typeof createStandard>
type StandardXRGamepad = ReturnType<typeof createXrStandard>

export function useGamepad(): StandardGamepad
export function useGamepad(options: UseGamepadOptions & { xr?: never }): StandardGamepad
export function useGamepad(options: UseGamepadOptions & { xr: true }): StandardXRGamepad
export function useGamepad(options: UseGamepadOptions = {}) {
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
          gamepad.touchpad,
          allEvents,
          events[6],
          axisDeadzone,
          axes[0],
          axes[1]
        )
        processAxis(
          'thumbstick',
          gamepad.thumbstick,
          allEvents,
          events[7],
          axisDeadzone,
          axes[2],
          axes[3]
        )
      })
    }

    let running = $state(false)

    useTask(processSnapshot, { autoInvalidate: false, running: () => running })

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

    $effect.pre(() => {
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

    return gamepad
  } else {
    for (let i = 0; i < standardButtons.length + standardAxes.length; i += 1) {
      events.push({})
    }

    const { index: gamepadIndex = 0 } = options
    const gamepad = createStandard(allEvents, events)

    const processSnapshot = () => {
      /**
       * getGamepads() will return a snapshot of a gamepad that will never change,
       * so it must be polled continuously to receive new values.
       */
      const pad = navigator.getGamepads()[gamepadIndex]
      gamepad.raw = pad

      const { buttons = [], axes = [] } = pad ?? {}

      standardButtons.forEach((name, index) =>
        processButton(name, gamepad[name], allEvents, events[index], buttons[index])
      )

      processAxis(
        'leftStick',
        gamepad.leftStick,
        allEvents,
        events[17],
        axisDeadzone,
        axes[0],
        axes[1]
      )
      processAxis(
        'rightStick',
        gamepad.rightStick,
        allEvents,
        events[18],
        axisDeadzone,
        axes[2],
        axes[3]
      )
    }

    let running = $state(false)

    useTask(processSnapshot, { autoInvalidate: false, running: () => running })

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

    return gamepad
  }
}
