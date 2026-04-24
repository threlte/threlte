import type { XRJointSpace } from 'three'
import { useTask, useThrelte } from '@threlte/core'
import type { HandJoints } from '../lib/handJoints.js'
import { useHand } from './useHand.svelte.js'
import { isPresenting } from '../internal/state.svelte.js'
import { runeToCurrentReadable } from './currentReadable.svelte.js'

/**
 * Provides a reference to a requested hand joint, once available.
 */
export const useHandJoint = (handedness: 'left' | 'right', joint: HandJoints) => {
  const { invalidate } = useThrelte()
  const handStore = useHand(handedness)
  const xrhand = $derived(handStore.current)

  let jointSpace = $state.raw<XRJointSpace>()

  useTask(
    () => {
      const space = xrhand?.hand.joints[joint]
      // The joint radius is a good indicator that the joint is ready.
      // Re-check each frame so we pick up reconnects and clear on disconnect.
      if (space?.jointRadius !== undefined) {
        if (jointSpace !== space) {
          jointSpace = space
          invalidate()
        }
      } else if (jointSpace !== undefined) {
        jointSpace = undefined
        invalidate()
      }
    },
    { running: () => isPresenting.current }
  )

  return runeToCurrentReadable(() => jointSpace)
}
