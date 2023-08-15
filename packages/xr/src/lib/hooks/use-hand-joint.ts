import { onDestroy } from 'svelte'
import { currentWritable } from '@threlte/core'
import type { HandJoints } from '../lib/hand-joints'
import type * as THREE from 'three'
import { useXrHand } from './use-hand'

const onHandReady = (handedness: 'left' | 'right', joint: HandJoints, callback: (jointSpace: THREE.XRJointSpace) => void) => {
  const xrhand = useXrHand(handedness)

  let id: number

  const tick = () => {
    const jointSpace = xrhand.current?.hand.joints[joint]

    if (jointSpace?.jointRadius === undefined) {
      id = setTimeout(tick, 100)
      return
    }

    callback(jointSpace)
  }

  tick()

  return () => clearTimeout(id)
}

/**
 * Provides a reference to a requested hand joint, once available.
 */
export const useHandJoint = (handedness: 'left' | 'right', joint: HandJoints) => {
  const jointSpace = currentWritable<THREE.XRJointSpace | undefined>(undefined)

  const unsub = onHandReady(handedness, joint, (joint) => jointSpace.set(joint))

  onDestroy(() => unsub())

  return jointSpace
}
