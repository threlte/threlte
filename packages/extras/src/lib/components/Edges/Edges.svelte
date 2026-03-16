<script lang="ts">
  import { T, isInstanceOf, useParent } from '@threlte/core'
  import { fromStore } from 'svelte/store'
  import { LineSegments } from 'three'
  import type { EdgesProps } from './types.js'

  let {
    thresholdAngle = 1,
    color = '#ffffff',
    ref = $bindable(),
    children,
    ...props
  }: EdgesProps = $props()

  const parent = fromStore(useParent())

  const geometry = $derived.by(() => {
    if (!isInstanceOf(parent.current, 'Mesh')) {
      throw new Error('Edges: component must be a child of a Mesh')
    }
    return parent.current.geometry
  })

  const segments = new LineSegments()
</script>

<T
  is={segments}
  bind:ref
  {...props}
>
  <T.EdgesGeometry args={[geometry, thresholdAngle]} />
  <T.LineBasicMaterial {color} />
  {@render children?.({ ref: segments })}
</T>
