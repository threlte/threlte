import { getContext, setContext } from 'svelte'
import type { RigidBodyEvents, ThrelteRigidBody } from '../types/types.js'

const eventsKey = Symbol('threlte-rapier-rigidbody-events')

interface RigidBodyEventsContext {
  current: RigidBodyEvents
}

export const provideRigidBodyEvents = (events: () => RigidBodyEvents) => {
  const context: RigidBodyEventsContext = {
    get current() {
      return events()
    }
  }

  setContext<RigidBodyEventsContext>(eventsKey, context)
}

export const useRigidBodyEvents = (): RigidBodyEventsContext => {
  const context = getContext<RigidBodyEventsContext>(eventsKey)

  return context ?? { current: {} }
}

export interface RigidBodyContext {
  current: ThrelteRigidBody | undefined
}

const key = Symbol('threlte-rapier-rigidbody')

export const provideRigidbody = (rigidBody: () => ThrelteRigidBody) => {
  const context: RigidBodyContext = {
    get current() {
      return rigidBody()
    }
  }

  setContext<RigidBodyContext>(key, context)
}

export const useRigidBody = (): RigidBodyContext => {
  const context = getContext<RigidBodyContext>(key)

  return context ?? { current: undefined }
}
