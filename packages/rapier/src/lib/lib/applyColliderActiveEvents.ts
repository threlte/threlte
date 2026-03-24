import { ActiveEvents, type Collider } from '@dimforge/rapier3d-compat'
import type { ColliderEvents, RigidBodyEvents } from '../types/types.js'

export const applyColliderActiveEvents = (
  collider: Collider,
  colliderEvents: ColliderEvents = {},
  rigidBodyEvents: RigidBodyEvents = {}
): void => {
  let events = 0

  if (
    colliderEvents.oncollisionenter ||
    colliderEvents.oncollisionexit ||
    rigidBodyEvents.oncollisionenter ||
    rigidBodyEvents.oncollisionexit ||
    colliderEvents.onsensorenter ||
    colliderEvents.onsensorexit ||
    rigidBodyEvents.onsensorenter ||
    rigidBodyEvents.onsensorexit
  ) {
    events = events | ActiveEvents.COLLISION_EVENTS
  }

  if (colliderEvents.oncontact || rigidBodyEvents.oncontact) {
    events = events | ActiveEvents.CONTACT_FORCE_EVENTS
  }

  if (events > 0) {
    collider.setActiveEvents(events)
  }
}
