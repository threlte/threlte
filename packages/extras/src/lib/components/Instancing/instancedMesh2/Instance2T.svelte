<script lang="ts">
  import { onDestroy } from 'svelte'
  import { events, type ThrelteEvents } from '../../../interactivity/types'
  import type { InteractivityCallback } from './InstancedMesh2Interactivity.svelte'
  import type { InstanceProps } from './types'
  import { useInstancedMesh2 } from './use-instanced-mesh2.svelte'
  import { T } from '@threlte/core'

  let { ref = $bindable(), children, ...props }: InstanceProps = $props()

  let instanceId = $state<number | null>(null)

  const { interactivity, instancedMesh2 } = useInstancedMesh2()

  $effect.pre(() => {
    if (instancedMesh2) {
      instancedMesh2.addInstances(1, (_obj, index) => {
        instanceId = index
      })
    }
  })

  $effect(() => {
    if (instanceId !== null && instancedMesh2) {
      for (const prop in props) {
        if (events.includes(prop as keyof ThrelteEvents)) {
          const handler = props[prop]

          if (handler) {
            interactivity[prop as keyof ThrelteEvents].set(
              instanceId,
              handler as InteractivityCallback
            )
          }
        }
      }
    }

    return () => {
      if (instanceId !== null && instancedMesh2) {
        for (const prop in props) {
          if (events.includes(prop as keyof ThrelteEvents)) {
            interactivity[prop as keyof ThrelteEvents].delete(instanceId)
          }
        }
      }
    }
  })

  $effect(() => {
    if (instanceId !== null && instancedMesh2) {
      const instance = instancedMesh2.instances[instanceId]

      if (props.color !== undefined) {
        // todo why setColor at works and .color doesnt
        instancedMesh2.setColorAt(instance.id, props.color)
      }

      instance.updateMatrix()
    }
  })

  onDestroy(() => {
    if (instancedMesh2 && typeof instanceId === 'number') {
      instancedMesh2.removeInstances(instanceId)

      for (const prop in props) {
        if (events.includes(prop as keyof ThrelteEvents)) {
          interactivity[prop as keyof ThrelteEvents].delete(instanceId)
        }
      }
    }
  })
</script>

<!-- todo this seems to add a few ms to load time -->
<!-- but I do want to expose it to people because of nice utils https://agargaro.github.io/instanced-mesh/api/classes/instancedentity/  -->
{#if instancedMesh2 && instanceId !== null && children}
  {@render children?.({ instance: instancedMesh2.instances[instanceId] })}
{/if}

{#if instancedMesh2 && instanceId !== null}
  <!-- TODO this is cool but doesnt seem to support pierced props rn! -->
  <T
    is={instancedMesh2.instances[instanceId]}
    attach={false}
    opacity={props.opacity}
    position={props.position}
    rotation={props.rotation}
    scale={props.scale}
  />
{/if}
