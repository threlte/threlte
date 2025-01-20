<script lang="ts">
  import { isInstanceOf, useParent, watch } from '@threlte/core'
  import { onDestroy, type Snippet } from 'svelte'
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

  watch(parent, (parent) => {
    if (isInstanceOf(parent, 'Object3D')) {
      parent.add(system.emitter)
    }
    return () => {
      if (isInstanceOf(parent, 'Object3D')) {
        parent.remove(system.emitter)
      }
    }
  })

  $effect.pre(() => {
    if (!name) return
    system.emitter.name = name
  })

  renderer.addSystem(system)
  onDestroy(() => {
    renderer.deleteSystem(system)
  })
</script>

{@render children?.({ system })}
