import { onDestroy } from 'svelte'
import { currentWritable, useFrame } from '@threlte/core'

type UseGamepadOptions = {
  /** An optional gamepad index, if multiple gamepads are used. */
  index?: number
  /** The mapping strategy for the gamepad. Default is 'none'. Choose 'standard' to enable mapping. */
  mapping?: 'none' | 'standard' // 'standard-xr'
  /** The threshold value of an axis before change events are fired. Default is 0.05. */
  axisChangeThreshold?: number
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
  'center',
] as const

const standardSticks = [
  'leftStick',
  'rightStick',
] as const

const gamepadEvents = [
  'change',
  'press',
  'down',
  'up',
  'touch',
  'touchstart',
  'touchend'
] as const

type StandardGamepadEvents = typeof gamepadEvents[number]
type StandardGamepadButtons = typeof standardButtons[number]
type StandardGamepadSticks = typeof standardSticks[number]

export type StandardGamepadEvent = {
  type: StandardGamepadEvents
  target: StandardGamepadButtons
  value: number
} | {
  type: 'change'
  target: StandardGamepadSticks
  value: {
    x: number
    y: number
  }
}

type Fn = (event: StandardGamepadEvent) => void
type Events = { [K in StandardGamepadEvents]?: Fn[] }

const createButton = (events: Events[], index: number) => {
  const on = (name: StandardGamepadEvents, fn: Fn) => {
    events[index][name] ??= []
    events[index][name]!.push(fn)
  }

  return {
    pressed: false,
    touched: false,
    value: 0,
    on,
  }
}

const createStick = (events: Events[], index: number) => {
  const on = (name: 'change', fn: Fn) => {
    events[index][name] ??= []
    events[index][name]!.push(fn)
  }

  return {
    x: 0,
    y: 0,
    on,
  }
}

const createStandard = (allEvents: Events, events: Events[]) => {
  const on = (name: StandardGamepadEvents, fn: Fn) => {
    allEvents[name] ??= []
    allEvents[name]!.push(fn)
  }

  return {
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
    leftStick: createStick(events, 17),
    /** axes[2], axes[3] - Horizontal / vertical axis for right stick (negative left/positive right) */
    rightStick: createStick(events, 18),

    on,
  }
}

type StandardGamepadButton = ReturnType<typeof createButton>
type StandardGamepadStick = ReturnType<typeof createStick>
type StandardGamepad = ReturnType<typeof createStandard>

export const useGamepad = (options: UseGamepadOptions = {}) => {
  const {
    index: gamepadIndex = 0,
    mapping = 'none',
    axisChangeThreshold = 0.05,
  } = options

  const allEvents: Events = {}
  const events: Events[] = Array
    .from({ length: standardButtons.length + standardSticks.length })
    .map(() => ({}))
  const gamepad = currentWritable<Gamepad | null>(null)
  const standardGamepad: StandardGamepad = createStandard(allEvents, events)

  const processButton = (
    target: StandardGamepadButtons,
    mappedButton: StandardGamepadButton,
    buttonEvents: Events,
    source?: GamepadButton
  ) => {
    const lastTouched = mappedButton.touched
    const lastPressed = mappedButton.pressed
    const lastValue = mappedButton.value

    mappedButton.touched = source?.touched ?? false
    mappedButton.pressed = source?.pressed ?? false
    const value = mappedButton.value = source?.value ?? 0

    if (!lastTouched && mappedButton.touched) {
      allEvents.touchstart?.forEach(fn => fn({ type: 'touchstart', target, value }))
      buttonEvents.touchstart?.forEach(fn => fn({ type: 'touchstart', target, value }))
    } else if (lastTouched && !mappedButton.touched) {
      allEvents.touch?.forEach(fn => fn({ type: 'touch', target, value }))
      buttonEvents.touch?.forEach(fn => fn({ type: 'touch', target, value }))
      allEvents.touchend?.forEach(fn => fn({ type: 'touchend', target, value }))
      buttonEvents.touchend?.forEach(fn => fn({ type: 'touchend', target, value }))
    }

    if (!lastPressed && mappedButton.pressed) {
      allEvents.down?.forEach(fn => fn({ type: 'down', target, value }))
      buttonEvents.down?.forEach(fn => fn({ type: 'down', target, value }))
    } else if (lastPressed && !mappedButton.pressed) {
      allEvents.press?.forEach(fn => fn({ type: 'press', target, value }))
      buttonEvents.press?.forEach(fn => fn({ type: 'press', target, value }))
      allEvents.up?.forEach(fn => fn({ type: 'up', target, value }))
      buttonEvents.up?.forEach(fn => fn({ type: 'up', target, value }))
    }

    if (lastValue !== mappedButton.value) {
      allEvents.change?.forEach(fn => fn({ type: 'change', target, value }))
      buttonEvents.change?.forEach(fn => fn({ type: 'change', target, value }))
    }
  }

  const processStick = (
    target: StandardGamepadSticks,
    mappedStick: StandardGamepadStick,
    stickEvents: Events,
    rawX = 0,
    rawY = 0
  ) => {
    const lastValueX = mappedStick.x
    const lastValueY = mappedStick.y

    const x = Math.abs(rawX) < axisChangeThreshold ? 0 : rawX
    const y = Math.abs(rawY) < axisChangeThreshold ? 0 : rawY
  
    mappedStick.x = x
    mappedStick.y = y

    if (lastValueX !== x || lastValueY !== y) {
      allEvents.change?.forEach(fn => fn({ type: 'change', target, value: { x, y } }))
      stickEvents.change?.forEach(fn => fn({ type: 'change', target, value: { x, y } }))
    }
  }
  
  const processSnapshot = () => {
    /**
     * getGamepads() will return a snapshot of a gamepad that will never change,
     * so it must be polled continuously to recieve new values.
     */
    const pad = navigator.getGamepads()[gamepadIndex]
    gamepad.set(pad)

    if (mapping === 'none') return

    const { buttons = [], axes = [] } = pad ?? {}

    // Handle standard mapping
    standardButtons.forEach((name, index) =>
      processButton(name, standardGamepad[name], events[index], buttons[index])
    )

    processStick('leftStick', standardGamepad.leftStick, events[17], axes[0], axes[1])
    processStick('rightStick', standardGamepad.rightStick, events[18], axes[2], axes[3])
  }

  const handleGamepadDisconnected = (event: GamepadEvent): void => {
    const { id } = event.gamepad

    if (id === gamepad.current?.id) {
      gamepad.set(null)
      stop()
    }
  }

  const handleGamepadConnected = (): void => {
    const pad = navigator.getGamepads()[gamepadIndex]

    if (pad) {
      gamepad.set(pad)
      start()
    }
  }

  if (typeof window !== undefined) {
    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)
  }

  onDestroy(() => {
    if (typeof window !== undefined) {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
    }
  })

  const { start, stop } = useFrame(processSnapshot, { autostart: false, invalidate: false })

  return { gamepad, standardGamepad }  
}
