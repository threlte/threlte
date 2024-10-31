<script lang="ts">
  import type { DetailedProps } from './Detailed'
  import type { Object3D } from 'three'
  import { LOD } from 'three'
  import { T, injectPlugin, isInstanceOf, observe, useParent } from '@threlte/core'
  import { onDestroy, untrack } from 'svelte'

  let { ref = $bindable(new LOD()), children, ...props }: DetailedProps = $props()

  injectPlugin<{ distance?: number; hysteresis?: number }>('detailed', (args) => {
    const parent = useParent()
    if (parent.current !== ref) return

    let previousRef: Object3D | undefined
    let previousDistance = args.props.distance
    let previousHysteresis = args.props.hysteresis

    const argsRef = $derived(isInstanceOf(args.ref, 'Object3D') ? args.ref : undefined)
    const distance = $derived(args.props.distance ?? 0)
    const hysteresis = $derived(args.props.hysteresis ?? 0)

    const addLevel = (object: Object3D, distance: number, hysteresis: number) => {
      ref.addLevel(object, distance, hysteresis)
    }

    const removeLevel = (object: Object3D) => {
      const i = ref.levels.findIndex((l) => l.object === object)
      if (i > -1) {
        ref.levels.splice(i, 1)
      }
    }

    const mutateLevel = (object: Object3D, distance: number, hysteresis: number) => {
      untrack(() => {
        const level = ref.levels.find((l) => l.object === object)
        if (!level) return
        level.distance = distance
        level.hysteresis = hysteresis
      })
    }

    observe.pre(
      () => [argsRef, distance, hysteresis],
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
      if (argsRef) removeLevel(argsRef)
    })

    return {
      pluginProps: ['distance', 'hysteresis']
    }
  })
</script>

<T
  is={ref}
  {...props}
>
  {@render children?.({ ref })}
</T>
