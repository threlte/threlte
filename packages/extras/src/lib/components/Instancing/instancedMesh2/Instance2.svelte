<script lang="ts">
  import { onDestroy } from 'svelte'
  import { events, type ThrelteEvents } from '../../../interactivity/types'
  import type { InteractivityCallback } from './InstancedMesh2Interactivity.svelte'
  import type { InstanceProps } from './types'
  import { useInstancedMesh2 } from './use-instanced-mesh2.svelte'

  let { ref = $bindable(), children, ...props }: InstanceProps = $props()

  let instanceId = $state<number | null>(null)

  const { interactivity, instancedMesh2 } = useInstancedMesh2()

  // const { enabled } = useInteractivity()

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

      if (props.position !== undefined) {
        if (Array.isArray(props.position)) {
          instance.position.set(...props.position)
        } else if (
          props.position &&
          typeof props.position === 'object' &&
          props.position !== null
        ) {
          const pos = props.position as any
          if ('x' in pos && 'y' in pos && 'z' in pos) {
            instance.position.set(pos.x, pos.y, pos.z)
          } else if (typeof pos.set === 'function') {
            instance.position.copy(pos)
          }
        }
      } else {
        instance.position.set(
          props['position.x'] ?? 0,
          props['position.y'] ?? 0,
          props['position.z'] ?? 0
        )
      }

      if (props.rotation !== undefined) {
        if (Array.isArray(props.rotation)) {
          instance.rotation.set(...props.rotation)
        } else if (
          props.rotation &&
          typeof props.rotation === 'object' &&
          props.rotation !== null
        ) {
          const rot = props.rotation as any
          if ('x' in rot && 'y' in rot && 'z' in rot) {
            instance.rotation.set(rot.x, rot.y, rot.z)
          } else if (typeof rot.set === 'function') {
            instance.rotation.copy(rot)
          }
        }
      } else {
        instance.rotation.set(
          props['rotation.x'] ?? 0,
          props['rotation.y'] ?? 0,
          props['rotation.z'] ?? 0
        )
      }

      if (props.scale !== undefined) {
        if (Array.isArray(props.scale)) {
          instance.scale.set(...props.scale)
        } else if (props.scale && typeof props.scale === 'object' && props.scale !== null) {
          const scale = props.scale as any

          if ('x' in scale && 'y' in scale && 'z' in scale) {
            instance.scale.set(scale.x, scale.y, scale.z)
          } else if (typeof scale.set === 'function') {
            instance.scale.copy(scale)
          }
        } else if (typeof props.scale === 'number') {
          instance.scale.setScalar(props.scale)
        }
      } else {
        instance.scale.set(props['scale.x'] ?? 1, props['scale.y'] ?? 1, props['scale.z'] ?? 1)
      }

      if (props.color !== undefined) {
        // todo why setColor at works and .color doesnt
        instancedMesh2.setColorAt(instance.id, props.color)
      }

      if (props.opacity !== undefined) {
        instancedMesh2.setOpacityAt(instance.id, props.opacity)
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
