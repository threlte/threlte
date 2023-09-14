import { onDestroy } from 'svelte'
import { currentWritable, useFrame } from '@threlte/core'

type UseGamepadOptions = {
  /** An optional gamepad index, if multiple gamepads are used. */
  index?: number
  /** The mapping strategy for the gamepad. Default is 'standard'. Choose 'none' to disable. */
  mapping?: 'none' | 'standard' // 'standard-xr'
}

const gamepadEvents = ['press', 'down', 'up', 'touch', 'touchstart', 'touchend'] as const

type GamepadEvents = typeof gamepadEvents[number]
type Fn = () => void
type Events = { [K in GamepadEvents]?: Fn[] }[]

const createButton = (events: Events, index: number) => {
  const on = (name: GamepadEvents, fn: Fn) => {
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

const createdMapped = (events: Events) => ({
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

  /** axes[0] - Horizontal axis for left stick (negative left/positive right) */
  leftStickX: 0,
  /** axes[1] - Vertical axis for left stick (negative up/positive down) */
  leftStickY: 0,
  /** axes[2] - Horizontal axis for right stick (negative left/positive right) */
  rightStickX: 0,
  /** axes[3] - Vertical axis for right stick (negative up/positive down) */
  rightStickY: 0,
})

type MappedGamepadButton = ReturnType<typeof createButton>
type MappedGamepad = ReturnType<typeof createdMapped>

export const useGamepad = (options: UseGamepadOptions = {}) => {
  const {
    index = 0,
    mapping = 'standard'
  } = options

  const events: Events = Array.from({ length: 17 }).map(() => ({}))
  const connected = currentWritable(false)
  const gamepad = currentWritable<Gamepad | null>(null)
  const mapped: MappedGamepad = createdMapped(events)

  const processButton = (mappedButton: MappedGamepadButton, buttons: readonly GamepadButton[], index: number) => {
    const lastTouched = mappedButton.touched
    mappedButton.touched = buttons[index]?.touched ?? false
  
    if (!lastTouched && mappedButton.touched) {
      events[index].touchstart?.forEach(fn => fn())
    } else if (lastTouched && !mappedButton.touched) {
      events[index].touch?.forEach(fn => fn())
      events[index].touchend?.forEach(fn => fn())
    }
  
    const lastPressed = mappedButton.pressed
    mappedButton.pressed = buttons[index]?.pressed ?? false

    if (!lastPressed && mappedButton.pressed) {
      events[index].down?.forEach(fn => fn())
    } else if (lastPressed && !mappedButton.pressed) {
      events[index].press?.forEach(fn => fn())
      events[index].up?.forEach(fn => fn())
    }

    mappedButton.value = buttons[index]?.value ?? 0
  }
  
  const processStandard = () => {
    const pad = navigator.getGamepads()[index]
    const { buttons = [], axes = [] } = pad ?? {}

    gamepad.set(pad)
  
    processButton(mapped.clusterBottom, buttons, 0)
    processButton(mapped.clusterRight, buttons, 1)
    processButton(mapped.clusterLeft, buttons, 2)
    processButton(mapped.clusterTop, buttons, 3)
    processButton(mapped.leftBumper, buttons, 4)
    processButton(mapped.rightBumper, buttons, 5)
    processButton(mapped.leftTrigger, buttons, 6)
    processButton(mapped.rightTrigger, buttons, 7)
    processButton(mapped.select, buttons, 8)
    processButton(mapped.start, buttons, 9)
    processButton(mapped.leftStickButton, buttons, 10)
    processButton(mapped.rightStickButton, buttons, 11)
    processButton(mapped.directionalTop, buttons, 12)
    processButton(mapped.directionalBottom, buttons, 13)
    processButton(mapped.directionalLeft, buttons, 14)
    processButton(mapped.directionalRight, buttons, 15)
  
    mapped.leftStickX = axes[0] ?? 0
    mapped.leftStickY = axes[1] ?? 0
    mapped.rightStickX = axes[2] ?? 0
    mapped.rightStickY = axes[3] ?? 0
  }

  const handleGamepadDisconnected = (event: GamepadEvent): void => {
    const { id } = event.gamepad

    if (id === gamepad.current?.id) {
      connected.set(false)
      gamepad.set(null)
    }
  }
  
  const handleGamepadConnected = (): void => {
    const pad = navigator.getGamepads()[index]

    if (pad) {
      connected.set(true)
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

  if (mapping === 'standard') {
    useFrame(processStandard)
  }

  return { gamepad, mapped, connected }  
}
