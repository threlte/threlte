import { currentWritable } from '@threlte/core'

export const left = currentWritable<undefined | any>(undefined)
export const right = currentWritable<undefined | any>(undefined)

export const useXrHand = (handedness: 'left' | 'right') => {
  switch (handedness) {
    case 'left': return left
    case 'right': return right
  }
}
