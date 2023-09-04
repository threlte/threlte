import { currentWritable, useFrame } from '@threlte/core'
import type * as THREE from 'three'
import type { HandJoints } from '../lib/handJoints'
import { useHand } from './useHand'

/**
 * Provides a reference to a requested hand joint, once available.
 */
export const useHandJoint = (handedness: 'left' | 'right', joint: HandJoints) => {
  const jointSpaceStore = currentWritable<THREE.XRJointSpace | undefined>(undefined)

  const xrhand = useHand(handedness)

  const { stop } = useFrame(
    ({ invalidate }) => {
      const jointSpace = xrhand.current?.hand.joints[joint]
      // The joint radius is a good indicator that the joint is ready
      if (jointSpace?.jointRadius !== undefined) {
        
        console.log('good!')
        jointSpaceStore.set(jointSpace)
        invalidate()
        stop()
      }
    },
    { invalidate: false }
  )

  return jointSpaceStore
}
