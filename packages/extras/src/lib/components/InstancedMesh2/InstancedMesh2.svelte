<script lang="ts">
  import type { Snippet } from 'svelte'
  import { createRadixSort, InstancedMesh2 } from '@three.ez/instanced-mesh'
  import { useThrelte, T, useTask } from '@threlte/core'

  import { createInstancedMesh2Context } from './InstancedMesh2Context.svelte'
  import { BufferGeometry, Material, Object3D, Raycaster, Vector2 } from 'three'
  import Instance2 from './Instance2.svelte'
  import { get } from 'svelte/store'

  let {
    bvh = false,
    count = 5,
    sort = false,
    children,
    ...rest
  }: {
    bvh: boolean
    count: number
    sort: boolean
    children: Snippet<[{ Instance2: typeof Instance2 }]>
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

  const { renderer, camera, scene } = useThrelte()

  const instancedMesh2 = $derived.by(() => {
    if (geometry && material) return new InstancedMesh2(renderer, count, geometry, material)
    return undefined
  })

  const ctx = createInstancedMesh2Context()

  $effect.pre(() => {
    ctx.ref = instancedMesh2
    if (ctx.ref) {
      ctx.ref.raycastOnlyFrustum = true
    }
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

  let onclick = $state()

  $effect.pre(() => {
    if (ctx.ref && ctx.onclick.size > 0) {
      console.log('has events registered')
      onclick = (e: any) => {
        ctx.onclick.get(e.instanceId)?.(e)
      }
    } else {
      onclick = undefined
    }
  })
</script>

{#if instancedMesh2}
  <T
    is={instancedMesh2}
    {...rest}
    {onclick}
  />
{/if}

<T
  is={proxy}
  attach={false}
>
  {@render children?.({ Instance2 })}
</T>
