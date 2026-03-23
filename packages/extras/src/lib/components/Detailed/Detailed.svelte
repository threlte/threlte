<script lang="ts">
  import type { DetailedProps } from './types.js'
  import type { Object3D } from 'three'
  import { LOD } from 'three'
  import { T, injectPlugin, isInstanceOf, observe, useParent } from '@threlte/core'
  import { onDestroy, untrack } from 'svelte'

  let { ref = $bindable(), children, ...props }: DetailedProps = $props()

  const lod = new LOD()

  injectPlugin<{ distance?: number; hysteresis?: number }>('detailed', (args) => {
    const parent = useParent()
    if (parent.current !== lod) return

    let previousRef: Object3D | undefined
    let previousDistance = args.props.distance
    let previousHysteresis = args.props.hysteresis

    const ref = $derived(isInstanceOf(args.ref, 'Object3D') ? args.ref : undefined)
    const distance = $derived(args.props.distance ?? 0)
    const hysteresis = $derived(args.props.hysteresis ?? 0)

    const addLevel = (ref: Object3D, distance: number, hysteresis: number) => {
      lod.addLevel(ref, distance, hysteresis)
    }

    const removeLevel = (ref: Object3D) => {
      const i = lod.levels.findIndex((l) => l.object === ref)
      if (i > -1) {
        lod.levels.splice(i, 1)
      }
    }

    const mutateLevel = (ref: Object3D, distance: number, hysteresis: number) => {
      untrack(() => {
        const level = lod.levels.find((l) => l.object === ref)
        if (!level) return
        level.distance = distance
        level.hysteresis = hysteresis
      })
    }

    observe.pre(
      () => [ref, distance, hysteresis],
      ([ref, distance, hysteresis]) => {
        if (ref !== previousRef) {
          // we remove the previous level
          if (previousRef) removeLevel(previousRef)
          // add the new level
          if (ref) addLevel(ref, distance, hysteresis)
          // and update the previous ref
          previousRef = ref
        }
        if (ref && (distance !== previousDistance || hysteresis !== previousHysteresis)) {
          mutateLevel(ref, distance, hysteresis)
          previousDistance = distance
          previousHysteresis = hysteresis
        }
      }
    )

    onDestroy(() => {
      if (ref) removeLevel(ref)
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
