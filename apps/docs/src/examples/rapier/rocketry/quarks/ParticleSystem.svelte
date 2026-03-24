<script lang="ts">
  import { isInstanceOf, useParent } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { ParticleSystem, type ParticleSystemParameters } from 'three.quarks'
  import { useBatchedRenderer } from './useBatchedRenderer'

  let {
    name,
    children,
    system = $bindable(),
    ...rest
  }: ParticleSystemParameters & {
    name?: string
    children?: Snippet<[{ system: ParticleSystem }]>
    system?: ParticleSystem
  } = $props()

  const { renderer } = useBatchedRenderer()

  system = new ParticleSystem({ ...rest })

  const parent = useParent()

  $effect(() => {
    if (isInstanceOf($parent, 'Object3D')) {
      $parent.add(system.emitter)
    }
    return () => {
      if (isInstanceOf($parent, 'Object3D')) {
        $parent.remove(system.emitter)
      }
    }
  })

  $effect(() => {
    if (!name) return
    system.emitter.name = name
  })

  $effect(() => {
    renderer.addSystem(system)
    return () => {
      renderer.deleteSystem(system)
    }
  })
</script>

{@render children?.({ system })}
