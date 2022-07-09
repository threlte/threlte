<script lang="ts">
  import { useThrelte } from '../../../hooks/useThrelte'
  import { onDestroy } from 'svelte'
  import { Color, EdgesGeometry, LineBasicMaterial, Mesh } from 'three'
  import { useParent } from '../../../internal/HierarchicalObject.svelte'
  import LineSegments from '../../../objects/LineSegments.svelte'
  import type { EdgesProperties } from '../../types/components'

  export let color: EdgesProperties['color'] = undefined
  export let material: EdgesProperties['material'] = undefined
  export let threshold: EdgesProperties['threshold'] = undefined

  // LineInstance
  export let position: EdgesProperties['position'] = undefined
  export let scale: EdgesProperties['scale'] = undefined
  export let rotation: EdgesProperties['rotation'] = undefined
  export let viewportAware: EdgesProperties['viewportAware'] = false
  export let inViewport: EdgesProperties['inViewport'] = false
  export let castShadow: EdgesProperties['castShadow'] = undefined
  export let receiveShadow: EdgesProperties['receiveShadow'] = undefined
  export let frustumCulled: EdgesProperties['frustumCulled'] = undefined
  export let renderOrder: EdgesProperties['renderOrder'] = undefined
  export let visible: EdgesProperties['visible'] = undefined
  export let interactive: EdgesProperties['interactive'] = false
  export let ignorePointer: EdgesProperties['ignorePointer'] = false
  export let lookAt: EdgesProperties['lookAt'] = undefined

  const parent = useParent()
  if (!$parent || $parent.type !== 'Mesh')
    throw new Error('Edges: component must be a child of a Mesh')

  const parentMesh = $parent as Mesh

  const geometry =
    'clone' in parentMesh.geometry ? parentMesh.geometry.clone() : parentMesh.geometry

  const edgesGeometry = new EdgesGeometry(geometry, threshold)

  const { invalidate } = useThrelte()

  let activeMaterial = !!material
    ? material
    : color
    ? new LineBasicMaterial({
        color
      })
    : new LineBasicMaterial()

  let previousMaterial = material
  $: {
    if (previousMaterial !== material) {
      // material changed
      if (material) {
        // there's actually a material, prioritize that
        activeMaterial = material
        invalidate('Edges: material changed')
      }
      previousMaterial = material
    }
  }

  let previousColor = color
  $: {
    if (previousColor !== color) {
      // color changed
      if (material) break $ // break if there's a material set
      const mat = activeMaterial as LineBasicMaterial
      mat.color = new Color(color)
      invalidate('Edges: color changed')
      previousColor = color
    }
  }

  onDestroy(() => {
    edgesGeometry.dispose()
  })
</script>

{#if edgesGeometry}
  <LineSegments
    geometry={edgesGeometry}
    material={activeMaterial}
    {position}
    {scale}
    {rotation}
    {lookAt}
    {castShadow}
    {receiveShadow}
    {frustumCulled}
    {renderOrder}
    {visible}
    {interactive}
    {ignorePointer}
    on:click
    on:contextmenu
    on:pointerup
    on:pointerdown
    on:pointerenter
    on:pointerleave
    on:pointermove
    {viewportAware}
    bind:inViewport
    on:viewportenter
    on:viewportleave
  >
    <slot />
  </LineSegments>
{/if}
