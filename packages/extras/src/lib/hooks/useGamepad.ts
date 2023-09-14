import { onDestroy } from 'svelte'
import { currentWritable } from '@threlte/core'

type UseGamepadOptions = {
  index?: number
}

export const useGamepad = (options: UseGamepadOptions = {}) => {
  const {
    index = 0
  } = options

  const gamepad = currentWritable<Gamepad | undefined>(undefined)

  const handleGamepadDisconnected = (event: GamepadEvent): void => {
    const { id } = event.gamepad

    if (id === gamepad.current?.id) {
      gamepad.set(undefined)
    }
  }
  
  const handleGamepadConnected = (): void => {
    const pad = navigator.getGamepads()[index]

    if (pad) {
      gamepad.set(pad)
    }
  }

  window.addEventListener('gamepadconnected', handleGamepadConnected)
  window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

  onDestroy(() => {
    window.removeEventListener('gamepadconnected', handleGamepadConnected)
    window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
  })

  return { gamepad }
}
