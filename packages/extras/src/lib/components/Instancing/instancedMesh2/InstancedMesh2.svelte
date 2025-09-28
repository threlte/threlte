<script lang="ts">
  import { InstancedMesh2 } from '@three.ez/instanced-mesh'
  import { T } from '@threlte/core'
  import { setContext } from 'svelte'
  import { Mesh } from 'three'
  import { getInteractivityContext } from '../../../interactivity/context'
  import { events, type IntersectionEvent } from '../../../interactivity/types'
  import type { InstancedMesh2Props } from './types'
  import {
    createInstancedMesh2Context,
    type InstancedMesh2Context
  } from './use-instanced-mesh2.svelte'

  let {
    ref = $bindable(),
    children,
    bvh,
    perObjectFrustumCulled = true,
    sortObjects = false,
    raycastOnlyFrustum = false,
    ...props
  }: InstancedMesh2Props = $props()

  let tempMesh = $state(new Mesh(undefined, undefined))
  let instancedMesh2 = $state<InstancedMesh2 | undefined>()
  let isCollecting = $state(true)

  // todo review if this is a good and reactive approach - useInteractivity was throwing error if gone since that is meant for users more than internals
  const interactivityContext = getInteractivityContext()

  const context: InstancedMesh2Context = createInstancedMesh2Context(() => instancedMesh2)

  setContext<InstancedMesh2Context>('instancedMesh2', context)

  $effect(() => {
    if (isCollecting && tempMesh.geometry && tempMesh.material) {
      instancedMesh2 = new InstancedMesh2(tempMesh.geometry, tempMesh.material, {
        createEntities: true,
        // todo review euler vs quaternion for ease of use
        allowsEuler: true
      })
      isCollecting = false

      if (bvh) {
        instancedMesh2.computeBVH()
      }
    }
  })

  $effect(() => {
    if (instancedMesh2) {
      instancedMesh2.perObjectFrustumCulled = perObjectFrustumCulled
    }
  })

  $effect(() => {
    if (instancedMesh2) {
      instancedMesh2.sortObjects = sortObjects
    }
  })

  $effect(() => {
    if (instancedMesh2) {
      instancedMesh2.raycastOnlyFrustum = raycastOnlyFrustum
    }
  })

  $effect(() => {
    if (instancedMesh2 && interactivityContext) {
      if (context.interactivity.eventCount > 0) {
        const presentEventTypes: (typeof events)[number][] = []

        for (const eventType of events) {
          const map = context.interactivity[eventType]
          if (map.size > 0) {
            presentEventTypes.push(eventType)
          }
        }

        if (presentEventTypes.length > 0) {
          const handlers: Record<string, (arg: unknown) => void> = {}

          for (const event of presentEventTypes) {
            handlers[event] = (intersectionEvent: unknown) => {
              const evt = intersectionEvent as IntersectionEvent<any>
              const instanceId = evt.instanceId
              if (instanceId !== undefined) {
                const instanceHandler = context.interactivity[event].get(instanceId)
                if (instanceHandler) {
                  instanceHandler(evt as any)
                }
              }
            }
          }

          interactivityContext.addInteractiveObject(instancedMesh2, handlers)
        }
      } else {
        interactivityContext.removeInteractiveObject(instancedMesh2)
      }
    }
  })
</script>

{#if instancedMesh2}
  <T
    is={instancedMesh2}
    bind:ref
    matrixAutoUpdate={false}
    {...props}
  >
    {@render children?.({ ref: instancedMesh2 })}
  </T>
{:else}
  <!-- Temporary mesh for collecting geometry and material -->
  <T
    is={tempMesh}
    attach={false}
  >
    {@render children?.({ ref: undefined })}
  </T>
{/if}
