import type { Collider, ColliderHandle } from '@dimforge/rapier3d-compat'
import { getContext } from 'svelte'
import type { CollisionGroupsContext } from '../types/types.js'

type ColliderMap = Map<
  ColliderHandle,
  {
    collider: Collider
    initialCollisionGroup: number
  }
>

const applyBitMask = (collidersMap: ColliderMap, bitMask: number) => {
  for (const value of collidersMap.values()) {
    if (value && value.collider && value.collider.isValid()) {
      value.collider.setCollisionGroups(bitMask)
    }
  }
}

export const useCollisionGroups = () => {
  const collidersMap: ColliderMap = new Map()

  const bitMask = getContext<CollisionGroupsContext>('threlte-rapier-collision-group')
  if (!bitMask) {
    return {
      registerColliders: () => {},
      removeColliders: () => {}
    }
  }

  $effect(() => {
    applyBitMask(collidersMap, bitMask())
  })

  const registerColliders = (colliders: Collider[]) => {
    for (const collider of colliders) {
      if (!collidersMap.has(collider.handle)) {
        collidersMap.set(collider.handle, {
          collider,
          initialCollisionGroup: collider.collisionGroups()
        })
      }
    }

    applyBitMask(collidersMap, bitMask())
  }

  const removeColliders = (colliders: Collider[]) => {
    for (const collider of colliders) {
      const mapItem = collidersMap.get(collider.handle)
      if (mapItem) {
        if (collider && collider.isValid()) {
          collider.setCollisionGroups(mapItem.initialCollisionGroup)
        }
      }
      collidersMap.delete(collider.handle)
    }
  }

  return {
    registerColliders,
    removeColliders
  }
}
