<script lang="ts">
  import type { DetailedProps } from './Detailed.svelte'
  import { LOD } from 'three'
  import { T, injectPlugin, useParent } from '@threlte/core'

  let { ref = $bindable(), children, ...props }: DetailedProps = $props()

  const lod = new LOD()

  injectPlugin('detailed', ({ ref, props }) => {
    const parent = useParent()
    if (parent.current === lod) {
      let currentRef = ref
      let currentDistance = props.distance ?? 0
      let currentHysteresis = props.hysteresis ?? 0

      return {
        onPropsChange(props) {
          const distance = props.distance ?? currentDistance
          const hysteresis = props.hysteresis ?? currentHysteresis
          // only update lod.levels if props have changed
          if (distance !== currentDistance || hysteresis !== currentHysteresis) {
            const object = lod.levels.find((level) => level === currentRef)
            if (object !== undefined) {
              object.distance = distance
              object.hysteresis = hysteresis
            }
          }
          currentDistance = distance
          currentHysteresis = hysteresis
        },
        onRefChange(ref) {
          lod.addLevel(ref, currentDistance, currentHysteresis)
          currentRef = ref
          return () => {
            const i = lod.levels.findIndex((l) => l.object === currentRef)
            if (i > -1) {
              lod.levels.splice(i, 0)
            }
          }
        },
        pluginProps: ['distance', 'hysteresis']
      }
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
