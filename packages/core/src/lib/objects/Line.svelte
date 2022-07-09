<script lang="ts">
  import { BufferGeometry, Line as ThreeLine, Vector3 } from 'three'
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
  export let geometry: LineProperties['geometry'] = undefined
  export let points: LineProperties['points'] = []
  export let material: LineProperties['material']

  let previousMaterial = material
  let previousGeometry = geometry
  let previousPoints = points

  const tempGeometry = new BufferGeometry()

  const { invalidate } = useThrelte()

  const maybeSetGeometryFromPoints = (points: LineProperties['points']) => {
    if (!points) return
    const v3Array = points.map((p) => (p instanceof Vector3 ? p : new Vector3().fromArray(p)))
    tempGeometry.setFromPoints(v3Array)
  }

  const useGeometry = (
    geometry: LineProperties['geometry']
  ): geometry is NonNullable<LineProperties['geometry']> => !!geometry

  if (!geometry) {
    maybeSetGeometryFromPoints(points)
  }

  export const line = new ThreeLine(useGeometry(geometry) ? geometry : tempGeometry, material)
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
      if (useGeometry(geometry)) {
        getLine().geometry = geometry
        invalidate('Line: geometry changed')
      }
    } else {
      if (useGeometry(geometry)) {
        invalidate('Line: geometry props changed')
      }
    }
    previousGeometry = geometry
  }

  $: {
    if (previousPoints !== points) {
      if (!geometry) {
        maybeSetGeometryFromPoints(points)
        getLine().geometry = tempGeometry
      }
      previousPoints = points
    }
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
