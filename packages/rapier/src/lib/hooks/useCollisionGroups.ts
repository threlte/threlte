import type { Collider, ColliderHandle } from '@dimforge/rapier3d-compat'
import { getContext, onDestroy } from 'svelte'
import { get } from 'svelte/store'
import type { CollisionGroupsContext } from '../types/types.js'

type ColliderMap = Map<
  ColliderHandle,
  {
    collider: Collider
    initialCollisionGroup: number
  }
>

const applyBitMask = (collidersMap: ColliderMap, bitMask: number) => {
  collidersMap.forEach((c) => {
    if (c && c.collider && c.collider.isValid()) {
      c.collider.setCollisionGroups(bitMask)
    }
  })
}

export const useCollisionGroups = () => {
  const collidersMap: ColliderMap = new Map()

  const bitMaskStore = getContext<CollisionGroupsContext>('threlte-rapier-collision-group')
  if (!bitMaskStore)
    return {
      registerColliders: () => {},
      removeColliders: () => {}
    }

  let bitMask = get(bitMaskStore)
  const unsubscribe = bitMaskStore.subscribe((newBitMask) => {
    bitMask = newBitMask
    applyBitMask(collidersMap, newBitMask)
  })
  onDestroy(unsubscribe)

  const registerColliders = (colliders: Collider[]) => {
    colliders.forEach((c) => {
      if (!collidersMap.has(c.handle)) {
        collidersMap.set(c.handle, {
          collider: c,
          initialCollisionGroup: c.collisionGroups()
        })
      }
    })
    applyBitMask(collidersMap, bitMask)
  }

  const removeColliders = (colliders: Collider[]) => {
    colliders.forEach((c) => {
      const mapItem = collidersMap.get(c.handle)
      if (mapItem) {
        if (c && c.isValid()) {
          c.setCollisionGroups(mapItem.initialCollisionGroup)
        }
      }
      collidersMap.delete(c.handle)
    })
  }

  return {
    registerColliders,
    removeColliders
  }
}
