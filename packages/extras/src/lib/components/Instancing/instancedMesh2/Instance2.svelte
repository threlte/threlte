<script lang="ts">
  import { getContext, onDestroy } from 'svelte'
  import type { InstanceProps } from '../types'
  import type { InstancedMesh2 } from '@three.ez/instanced-mesh'

  let { ref = $bindable(), ...props }: InstanceProps = $props()

  const ctx = getContext<{ instancedMesh2: InstancedMesh2 }>('instancedMesh2')
  let instanceId = $state<number | null>(null)

  $effect.pre(() => {
    if (ctx.instancedMesh2) {
      ctx.instancedMesh2.addInstances(1, (_obj, index) => {
        instanceId = index
      })
    }
  })

  $effect(() => {
    if (instanceId !== null && ctx.instancedMesh2) {
      ctx.instancedMesh2.instances[instanceId].position.set(
        props['position.x'] ?? 0,
        props['position.y'] ?? 0,
        props['position.z'] ?? 0
      )

      ctx.instancedMesh2.instances[instanceId].rotation.set(
        props['rotation.x'] ?? 0,
        props['rotation.y'] ?? 0,
        props['rotation.z'] ?? 0
      )

      ctx.instancedMesh2.instances[instanceId].updateMatrix()
    }
  })

  onDestroy(() => {
    if (ctx.instancedMesh2 && typeof instanceId === 'number') {
      ctx.instancedMesh2.removeInstances(instanceId)
    }
  })
</script>
