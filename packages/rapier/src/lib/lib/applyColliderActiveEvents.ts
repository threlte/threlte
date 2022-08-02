import { ActiveEvents, type Collider } from '@dimforge/rapier3d-compat'
import type { useHasEventListeners } from '../hooks/useHasEventListener'
import type { ColliderEventDispatcher, RigidBodyEventDispatcher } from '../types/types'

export const applyColliderActiveEvents = (
  collider: Collider,
  colliderHasEventListeners: ReturnType<
    typeof useHasEventListeners<ColliderEventDispatcher>
  >['hasEventListeners'],
  rigidBodyHasEventListeners?: ReturnType<
    typeof useHasEventListeners<RigidBodyEventDispatcher>
  >['hasEventListeners']
): void => {
  let events = 0
  if (
    colliderHasEventListeners('collisionenter') ||
    colliderHasEventListeners('collisionexit') ||
    rigidBodyHasEventListeners?.('collisionenter') ||
    rigidBodyHasEventListeners?.('collisionexit') ||
    colliderHasEventListeners('sensorenter') ||
    colliderHasEventListeners('sensorexit') ||
    rigidBodyHasEventListeners?.('sensorenter') ||
    rigidBodyHasEventListeners?.('sensorexit')
  ) {
    events = events | ActiveEvents.COLLISION_EVENTS
  }
  if (colliderHasEventListeners('contact') || rigidBodyHasEventListeners?.('contact')) {
    events = events | ActiveEvents.CONTACT_FORCE_EVENTS
  }
  if (events > 0) {
    collider.setActiveEvents(events)
  }
}
