<script lang="ts">
  import { T, useParent, forwardEventHandlers } from '@threlte/core'
  import type { Mesh } from 'three'
  import type { EdgesEvents, EdgesProps, EdgesSlots } from './Edges.svelte'

  type $$Props = EdgesProps
  type $$Events = EdgesEvents
  type $$Slots = EdgesSlots

  export let thresholdAngle: $$Props['thresholdAngle'] = undefined as $$Props['thresholdAngle']
  export let color: $$Props['color'] = undefined as $$Props['color']

  const parent = useParent()
  if (!$parent || $parent.type !== 'Mesh')
    throw new Error('Edges: component must be a child of a Mesh')

  $: parentMesh = $parent as Mesh
  $: geometry = 'clone' in parentMesh.geometry ? parentMesh.geometry.clone() : parentMesh.geometry

  const component = forwardEventHandlers()
</script>

<T.LineSegments
  let:ref
  {...$$restProps}
  bind:this={$component}
>
  <T.EdgesGeometry args={[geometry, thresholdAngle]} />
  <T.LineBasicMaterial {color} />
  <slot {ref} />
</T.LineSegments>
