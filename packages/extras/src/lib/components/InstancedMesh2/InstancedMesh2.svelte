<script lang="ts">
  import type { Snippet } from 'svelte'
  import { createRadixSort, InstancedMesh2 } from '@three.ez/instanced-mesh'
  import { useThrelte, T } from '@threlte/core'

  import { createInstancedMesh2Context } from './InstancedMesh2Context.svelte'
  import { BufferGeometry, Material, Object3D } from 'three'
  import Instance2 from './Instance2.svelte'

  let {
    count = 5,
    children,
    sort = false
  }: {
    count: number
    children: Snippet<[{ Instance2: typeof Instance2 }]>
    sort: boolean
  } = $props()

  let material = $state<any>()
  let geometry = $state<any>()

  const proxy = {
    isObject3D: true,
    add: (child: Object3D) => {},
    remove: (child: Object3D) => {},
    set material(m: Material) {
      material = m
    },
    set geometry(g: BufferGeometry) {
      geometry = g
    }
  }

  const { renderer } = useThrelte()

  const instancedMesh2 = $derived.by(() => {
    if (geometry && material) return new InstancedMesh2(renderer, count, geometry, material)
    return undefined
  })

  const ctx = createInstancedMesh2Context()

  $effect.pre(() => {
    ctx.ref = instancedMesh2
  })

  $effect.pre(() => {
    if (!ctx.ref) return

    if (sort) {
      ctx.ref.sortObjects = true
      // todo add option to use different sorts
      ctx.ref.customSort = createRadixSort(ctx.ref)
    } else {
      ctx.ref.sortObjects = false
    }
  })
</script>

{#if instancedMesh2}
  <T is={instancedMesh2} />
{/if}

<T
  is={proxy}
  attach={false}
>
  {@render children?.({ Instance2 })}
</T>
