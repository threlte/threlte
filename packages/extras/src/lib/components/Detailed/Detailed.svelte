<script lang="ts">
  import type { DetailedProps } from './types.js'

  import { LOD } from 'three'
  import { T, injectPlugin, isInstanceOf } from '@threlte/core'
  import { untrack } from 'svelte'

  let { ref = $bindable(), children, ...props }: DetailedProps = $props()

  const lod = new LOD()

  injectPlugin<{ distance?: number; hysteresis?: number }>('detailed', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return
    if (args.ref === lod) return

    const distance = $derived(args.props.distance ?? 0)
    const hysteresis = $derived(args.props.hysteresis ?? 0)

    $effect(() => {
      const { ref } = args

      return untrack(() => {
        lod.addLevel(ref, distance, hysteresis)

        return () => {
          const i = lod.levels.findIndex((l) => l.object === ref)
          if (i > -1) {
            lod.levels.splice(i, 1)
          }
        }
      })
    })

    $effect(() => {
      const { ref } = args
      const level = lod.levels.find((l) => l.object === ref)

      if (level) {
        level.distance = distance
        level.hysteresis = hysteresis
      }
    })

    return {
      pluginProps: ['distance', 'hysteresis']
    }
  })
</script>

<T
  is={lod}
  bind:ref
  {...props}
>
  {@render children?.({ ref: lod })}
</T>
