<script lang="ts">
  import { T, useParent } from '@threlte/core'
  import { LineSegments, type Mesh } from 'three'
  import type { EdgesEvents, EdgesProps } from './Edges.svelte'

  type $$Events = EdgesEvents

  let { thresholdAngle, color, ref = $bindable(), children, ...props }: EdgesProps = $props()

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
	{#if children}
		{@render children({ref:lineSegments})}
	{/if}
</T>
