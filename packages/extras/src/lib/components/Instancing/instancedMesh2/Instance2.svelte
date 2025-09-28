<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { InstanceProps } from '../types'
  import { useInstancedMesh2 } from './use-instanced-mesh2.svelte'
  import { events, type ThrelteEvents } from '../../../interactivity/types'
  import { Color } from 'three'

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

      instance.updateMatrix()
    }
  })

  onDestroy(() => {
    if (instancedMesh2 && typeof instanceId === 'number') {
      instancedMesh2.removeInstances(instanceId)

      for (const prop in props) {
        if (isEventName(prop)) {
          interactivity[prop].delete(instanceId)
        }
      }
    }
  })
</script>
