import { currentWritable } from '@threlte/core'
import type { XRController } from '$lib/types'

export const left = currentWritable<undefined | XRController>(undefined)
export const right = currentWritable<undefined | XRController>(undefined)
export const gaze = currentWritable<undefined | XRController>(undefined)

const gamepadLeft = currentWritable<Gamepad | undefined>(undefined)
const gamepadRight = currentWritable<Gamepad | undefined>(undefined)

left.subscribe((value) => gamepadLeft.set(value?.inputSource.gamepad))
right.subscribe((value) => gamepadRight.set(value?.inputSource.gamepad))

export const useXrController = (handedness: XRHandedness) => {
  switch (handedness) {
    case 'left': return left
    case 'right': return right
    case 'none': return gaze
  }
}

export const useXrGamepad = (handedness: 'left' | 'right') => {
  switch (handedness) {
    case 'left': return gamepadLeft
    case 'right': return gamepadRight
  }
}
