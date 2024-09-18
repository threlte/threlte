<script lang="ts">
  import type { Snippet } from 'svelte'
  import { InstancedMesh2 } from '@three.ez/instanced-mesh'
  import { useThrelte, T } from '@threlte/core'

  import { createInstancedMesh2Context } from './InstancedMesh2Context.svelte'
  import { BufferGeometry, Material, Object3D } from 'three'

  let { count = 5, children }: { count: number; children: Snippet } = $props()

  let material = $state<any>()
  let geometry = $state<any>()

  const proxy = {
    isObject3D: true,
    add: (child: Object3D) => {},
    remove: (child: Object3D) => {},
    set material(m: Material) {
      console.log('setting material')
      console.log(m)
      material = m
    },
    set geometry(g: BufferGeometry) {
      console.log('setting geometry')
      console.log(g)
      geometry = g
    }
  }

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

<T
  is={proxy}
  attach={false}
>
  {@render children()}
</T>
