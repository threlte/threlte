import { onDestroy } from 'svelte'
import { currentWritable } from '@threlte/core'
import type { HandJoints } from '../lib/handJoints'
import type * as THREE from 'three'
import { useHand } from './useHand'

const onHandReady = (
  handedness: 'left' | 'right',
  joint: HandJoints,
  callback: (jointSpace: THREE.XRJointSpace) => void
) => {
  const xrhand = useHand(handedness)

  let id: number

  const tick = () => {
    const jointSpace = xrhand.current?.hand.joints[joint]

    if (jointSpace?.jointRadius === undefined) {
      id = window.setTimeout(tick, 100)
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

  onDestroy(onHandReady(handedness, joint, (joint) => jointSpace.set(joint)))

  return jointSpace
}
