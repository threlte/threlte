<script lang="ts">
  import type { Snippet } from 'svelte'

  import { injectPlugin } from '@threlte/core'
  import { InstancedMesh2 } from '@three.ez/instanced-mesh'
  import { useThrelte, T } from '@threlte/core'
  import InnerInstancedMesh2 from './InnerInstancedMesh2.svelte'
  import { createInstancedMesh2Context } from './InstancedMesh2Context.svelte'

  let material = $state<any>()
  let geometry = $state<any>()

  injectPlugin('instanced-mesh-2-matgeo-capture', ({ ref }) => {
    console.log(ref)
    if (ref.isMaterial) {
      material = ref
    }
    if (ref.isBufferGeometry) {
      geometry = ref
    }
  })

  let { count = 5, children }: { count: number; children: Snippet } = $props()

  const { renderer, scene } = useThrelte()

  const instancedMesh2 = $derived.by(() => {
    if (geometry && material) return new InstancedMesh2(renderer, count, geometry, material)
    return undefined
  })

  const ctx = createInstancedMesh2Context()

  $effect(() => {
    ctx.ref = instancedMesh2
  })
</script>

{#if instancedMesh2}
  <T is={instancedMesh2} />
{/if}

<InnerInstancedMesh2>
  {@render children()}
</InnerInstancedMesh2>
