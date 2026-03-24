import { getContext } from 'svelte'
import type { RigidBodyContext } from '../types/types.js'

export const useRigidBody = (): RigidBodyContext | undefined => {
  return getContext<RigidBodyContext>('threlte-rapier-rigidbody')
}
