<script lang="ts">
  import { useParent, watch } from '@threlte/core'
  import { onDestroy, type Snippet } from 'svelte'
  import { Object3D } from 'three'
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
  const isObject3D = (parent: any): parent is Object3D => {
    return parent.isObject3D
  }
  watch(parent, (parent) => {
    if (isObject3D(parent)) {
      parent.add(system.emitter)
    }
    return () => {
      if (isObject3D(parent)) {
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
