<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Vector3 } from 'three'
  import { Line2 as ThreeLine2 } from 'three/examples/jsm/lines/Line2'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
  import { useThrelte } from '../hooks/useThrelte'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import DisposableObject from '../internal/DisposableObject.svelte'
  import type { Line2Properties } from '../types/components'

  // LineInstance
  export let position: Line2Properties['position'] = undefined
  export let scale: Line2Properties['scale'] = undefined
  export let rotation: Line2Properties['rotation'] = undefined
  export let viewportAware: Line2Properties['viewportAware'] = false
  export let inViewport: Line2Properties['inViewport'] = false
  export let castShadow: Line2Properties['castShadow'] = undefined
  export let receiveShadow: Line2Properties['receiveShadow'] = undefined
  export let frustumCulled: Line2Properties['frustumCulled'] = undefined
  export let renderOrder: Line2Properties['renderOrder'] = undefined
  export let visible: Line2Properties['visible'] = undefined
  export let userData: Line2Properties['userData'] = undefined
  export let dispose: Line2Properties['dispose'] = undefined
  export let interactive: Line2Properties['interactive'] = false
  export let ignorePointer: Line2Properties['ignorePointer'] = false
  export let lookAt: Line2Properties['lookAt'] = undefined

  // self
  export let points: Line2Properties['points'] = []
  export let material: Line2Properties['material']

  let fallbackGeometry = new LineGeometry()
  fallbackGeometry.setPositions([0, 0, 0])

  let geometry: LineGeometry | undefined = undefined
  export const line2 = new ThreeLine2(undefined, material)

  onDestroy(() => {
    fallbackGeometry.dispose()
    geometry?.dispose()
  })

  const getLine = () => line2

  const { invalidate } = useThrelte()

  $: {
    geometry?.dispose()
    if (points.length) {
      geometry = new LineGeometry()
      geometry.setPositions(points.map((p) => (p instanceof Vector3 ? p.toArray() : p)).flat())
      line2.geometry = geometry
    } else {
      line2.geometry = fallbackGeometry
    }
    line2.computeLineDistances()
    invalidate('Line2: points changed')
  }

  let previousMaterial = material
  $: {
    if (material !== previousMaterial) {
      getLine().material = material
      invalidate('Line2: material changed')
    } else {
      invalidate('Line2: material props changed')
    }
    previousMaterial = material
  }
</script>

<DisposableObject object={fallbackGeometry} />
<DisposableObject object={geometry} />

<MeshInstance
  mesh={line2}
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
</MeshInstance>
