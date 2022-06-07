<script lang="ts">
  import { Line as ThreeLine } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LineInstance from '../instances/LineInstance.svelte'
  import type { LineProperties } from '../types/components'

  // LineInstance
  export let position: LineProperties['position'] = undefined
  export let scale: LineProperties['scale'] = undefined
  export let rotation: LineProperties['rotation'] = undefined
  export let viewportAware: LineProperties['viewportAware'] = false
  export let inViewport: LineProperties['inViewport'] = false
  export let castShadow: LineProperties['castShadow'] = undefined
  export let receiveShadow: LineProperties['receiveShadow'] = undefined
  export let frustumCulled: LineProperties['frustumCulled'] = undefined
  export let renderOrder: LineProperties['renderOrder'] = undefined
  export let visible: LineProperties['visible'] = undefined
  export let interactive: LineProperties['interactive'] = false
  export let ignorePointer: LineProperties['ignorePointer'] = false
  export let lookAt: LineProperties['lookAt'] = undefined

  // self
  export let geometry: LineProperties['geometry']
  export let material: LineProperties['material']

  let previousMaterial = material
  let previousGeometry = geometry

  const { invalidate } = useThrelte()

  export const line = new ThreeLine(geometry, material)
  const getLine = () => line

  $: {
    if (material !== previousMaterial) {
      getLine().material = material
      invalidate('Line: material changed')
    } else {
      invalidate('Line: material props changed')
    }
    previousMaterial = material
  }

  $: {
    if (geometry !== previousGeometry) {
      getLine().geometry = geometry
      invalidate('Line: geometry changed')
    } else {
      invalidate('Line: geometry props changed')
    }
    previousGeometry = geometry
  }
</script>

<LineInstance
  {line}
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
</LineInstance>
