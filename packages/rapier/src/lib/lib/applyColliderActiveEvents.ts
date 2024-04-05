import { ActiveEvents, type Collider } from '@dimforge/rapier3d-compat'

export const applyColliderActiveEvents = (
  collider: Collider,
  colliderEvents: Record<string, (arg: unknown) => void> = {},
  rigidBodyEvents: Record<string, (arg: unknown) => void> = {}
): void => {
  let events = 0

  if (
    colliderEvents.collisionenter ||
    colliderEvents.collisionexit ||
    rigidBodyEvents.collisionenter ||
    rigidBodyEvents.collisionexit ||
    colliderEvents.sensorenter ||
    colliderEvents.sensorexit ||
    rigidBodyEvents.sensorenter ||
    rigidBodyEvents.sensorexit
  ) {
    events = events | ActiveEvents.COLLISION_EVENTS
  }

  if (colliderEvents.contact || rigidBodyEvents.contact) {
    events = events | ActiveEvents.CONTACT_FORCE_EVENTS
  }

  if (events > 0) {
    collider.setActiveEvents(events)
  }
}
