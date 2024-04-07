<script lang="ts">
  import { T, useParent } from '@threlte/core'
  import type { LineSegments, Mesh } from 'three'
  import type { EdgesEvents, EdgesProps, EdgesSlots } from './Edges.svelte'

  type $$Props = EdgesProps
  type $$Events = EdgesEvents
  type $$Slots = EdgesSlots

  let {
    thresholdAngle,
    color,
    ref = $bindable(),
    ...props
  }: EdgesProps & { ref: LineSegments } = $props()

  const parent = useParent()

  if (!$parent || $parent.type !== 'Mesh') {
    throw new Error('Edges: component must be a child of a Mesh')
  }

  let geometry = $derived.by(() => {
    const parentMesh = $parent as Mesh
    return 'clone' in parentMesh.geometry ? parentMesh.geometry.clone() : parentMesh.geometry
  })
</script>

<T.LineSegments
  bind:ref
  {...props}
>
  <T.EdgesGeometry args={[geometry, thresholdAngle]} />
  <T.LineBasicMaterial {color} />
  <slot {ref} />
</T.LineSegments>
