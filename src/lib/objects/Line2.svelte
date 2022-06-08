<script lang="ts">
  import { onDestroy } from 'svelte'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
  import { useThrelte } from '../hooks/useThrelte'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import type { Line2Properties } from '../types/components'
  import { Line2 as ThreeLine2 } from 'three/examples/jsm/lines/Line2'
  import { Vector3 } from 'three'

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
  export let interactive: Line2Properties['interactive'] = false
  export let ignorePointer: Line2Properties['ignorePointer'] = false
  export let lookAt: Line2Properties['lookAt'] = undefined

  // self
  export let points: Line2Properties['points'] = []
  export let material: Line2Properties['material']

  const geometry = new LineGeometry()
  const pointTuples = points.map((p) => (p instanceof Vector3 ? p.toArray() : p))
  geometry.setPositions(pointTuples.flat())

  export const line2 = new ThreeLine2(geometry, material)

  line2.computeLineDistances()
  onDestroy(() => {
    geometry.dispose()
  })

  const getLine = () => line2

  const { invalidate } = useThrelte()

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

  let previousPoints = points
  $: {
    if (points !== previousPoints) {
      const pointTuples = points.map((p) => (p instanceof Vector3 ? p.toArray() : p))
      geometry.setPositions(pointTuples.flat())
      line2.computeLineDistances()
      invalidate('Line2: points changed')
      previousPoints = points
    }
  }
</script>

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
