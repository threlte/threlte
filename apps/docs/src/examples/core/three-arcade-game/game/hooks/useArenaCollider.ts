import type { CollisionEnterEvent } from '@threlte/rapier'
import { Tween } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'
import { game } from '../Game.svelte'

export const useArenaCollisionEnterEvent = () => {
  const opacity = new Tween(0.05, {
    easing: cubicOut
  })

  const onCollision: CollisionEnterEvent = (event) => {
    if (!event.targetRigidBody || event.targetRigidBody?.handle !== game.ballRigidBody?.handle) {
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
