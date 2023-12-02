import type { CollisionEnterEvent } from '@threlte/rapier'
import { tweened } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'
import { gameState } from '../state'
import { get } from 'svelte/store'

export const useArenaCollisionEnterEvent = () => {
  const { ballRigidBody } = gameState

  const opacity = tweened(0.05, {
    easing: cubicOut
  })

  const onCollision = (event: CollisionEnterEvent) => {
    if (
      !event.detail.targetRigidBody ||
      event.detail.targetRigidBody?.handle !== get(ballRigidBody)?.handle
    ) {
      return
    }
    opacity.set(0.7, {
      duration: 0
    })
    opacity.set(0.05, {
      duration: 500
    })
  }

  return {
    onCollision,
    opacity
  }
}
