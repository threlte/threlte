<script lang="ts">
  import { LineSegments as ThreeLineSegments } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LineInstance from '../instances/LineInstance.svelte'
  import DisposableObject from '../internal/DisposableObject.svelte'
  import type { LineSegmentsProperties } from '../types/components'

  // LineInstance
  export let position: LineSegmentsProperties['position'] = undefined
  export let scale: LineSegmentsProperties['scale'] = undefined
  export let rotation: LineSegmentsProperties['rotation'] = undefined
  export let viewportAware: LineSegmentsProperties['viewportAware'] = false
  export let inViewport: LineSegmentsProperties['inViewport'] = false
  export let castShadow: LineSegmentsProperties['castShadow'] = undefined
  export let receiveShadow: LineSegmentsProperties['receiveShadow'] = undefined
  export let frustumCulled: LineSegmentsProperties['frustumCulled'] = undefined
  export let renderOrder: LineSegmentsProperties['renderOrder'] = undefined
  export let visible: LineSegmentsProperties['visible'] = undefined
  export let userData: LineSegmentsProperties['userData'] = undefined
  export let dispose: LineSegmentsProperties['dispose'] = undefined
  export let interactive: LineSegmentsProperties['interactive'] = false
  export let ignorePointer: LineSegmentsProperties['ignorePointer'] = false
  export let lookAt: LineSegmentsProperties['lookAt'] = undefined

  // self
  export let geometry: LineSegmentsProperties['geometry']
  export let material: LineSegmentsProperties['material']

  let previousMaterial = material
  let previousGeometry = geometry

  const { invalidate } = useThrelte()

  export const lineSegments = new ThreeLineSegments(geometry, material)
  const getLineSegments = () => lineSegments

  $: {
    if (material !== previousMaterial) {
      getLineSegments().material = material
      invalidate('LineSegments: material changed')
    } else {
      invalidate('LineSegments: material props changed')
    }
    previousMaterial = material
  }

  $: {
    if (geometry !== previousGeometry) {
      getLineSegments().geometry = geometry
      invalidate('LineSegments: geometry changed')
    } else {
      invalidate('LineSegments: geometry props changed')
    }
    previousGeometry = geometry
  }
</script>

<DisposableObject {dispose} object={geometry} />
<DisposableObject {dispose} object={material} />

<LineInstance
  line={lineSegments}
  {position}
  {scale}
  {rotation}
  {lookAt}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {visible}
  {userData}
  {dispose}
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
</LineInstance>
