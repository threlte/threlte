<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { InstanceProps } from '../types'
  import { useInstancedMesh2 } from './use-instanced-mesh2.svelte'
  import { events, type ThrelteEvents } from '../../../interactivity/types'

  let { ref = $bindable(), ...props }: InstanceProps = $props()

  let instanceId = $state<number | null>(null)

  const { interactivity, instancedMesh2 } = useInstancedMesh2()

  $effect.pre(() => {
    if (instancedMesh2) {
      instancedMesh2.addInstances(1, (_obj, index) => {
        instanceId = index
      })
    }
  })

  function isEventName(prop: string): prop is keyof ThrelteEvents {
    return events.includes(prop as keyof ThrelteEvents)
  }

  $effect(() => {
    if (instanceId !== null && instancedMesh2) {
      for (const prop in props) {
        if (isEventName(prop)) {
          const handler = props[prop]

          if (handler) {
            interactivity[prop].set(instanceId, handler)
          }
        }
      }
    }

    return () => {
      if (instanceId !== null && instancedMesh2) {
        for (const prop in props) {
          if (isEventName(prop)) {
            interactivity[prop].delete(instanceId)
          }
        }
      }
    }
  })

  // Position/rotation effect remains the same
  $effect(() => {
    if (instanceId !== null && instancedMesh2) {
      instancedMesh2.instances[instanceId].position.set(
        props['position.x'] ?? 0,
        props['position.y'] ?? 0,
        props['position.z'] ?? 0
      )

      instancedMesh2.instances[instanceId].rotation.set(
        props['rotation.x'] ?? 0,
        props['rotation.y'] ?? 0,
        props['rotation.z'] ?? 0
      )

      instancedMesh2.instances[instanceId].updateMatrix()
    }
  })

  onDestroy(() => {
    if (instancedMesh2 && typeof instanceId === 'number') {
      instancedMesh2.removeInstances(instanceId)

      // Also clean up any remaining event handlers
      for (const prop in props) {
        if (isEventName(prop)) {
          interactivity[prop].delete(instanceId)
        }
      }
    }
  })
</script>
