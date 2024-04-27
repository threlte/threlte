<script lang="ts">
  import { T, useParent } from '@threlte/core'
  import { LineSegments, type Mesh } from 'three'
  import type { EdgesEvents, EdgesProps, EdgesSlots } from './Edges.svelte'

  type $$Events = EdgesEvents
  type $$Slots = EdgesSlots

  let { thresholdAngle, color, ref = $bindable(), ...props }: EdgesProps = $props()

  const parent = useParent()

  const lineSegments = new LineSegments()

  if (!$parent || $parent.type !== 'Mesh') {
    throw new Error('Edges: component must be a child of a Mesh')
  }

  let geometry = $derived.by(() => {
    const parentMesh = $parent as Mesh
    return 'clone' in parentMesh.geometry ? parentMesh.geometry.clone() : parentMesh.geometry
  })
</script>

<T
  is={lineSegments}
  bind:ref
  {...props}
>
  <T.EdgesGeometry args={[geometry, thresholdAngle]} />
  <T.LineBasicMaterial {color} />
  <slot ref={lineSegments} />
</T>
