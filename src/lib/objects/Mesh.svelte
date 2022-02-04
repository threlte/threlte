<script lang="ts">
  import { Mesh as ThreeMesh } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import type { MeshProperties } from '../types/components'

  // MeshInstance
  export let position: MeshProperties['position'] = undefined
  export let scale: MeshProperties['scale'] = undefined
  export let rotation: MeshProperties['rotation'] = undefined
  export let viewportAware: MeshProperties['viewportAware'] = false
  export let inViewport: MeshProperties['inViewport'] = false
  export let castShadow: MeshProperties['castShadow'] = undefined
  export let receiveShadow: MeshProperties['receiveShadow'] = undefined
  export let frustumCulled: MeshProperties['frustumCulled'] = undefined
  export let renderOrder: MeshProperties['renderOrder'] = undefined
  export let visible: MeshProperties['visible'] = undefined
  export let interactive: MeshProperties['interactive'] = false
  export let ignorePointer: MeshProperties['ignorePointer'] = false
  export let lookAt: MeshProperties['lookAt'] = undefined

  // self
  export let geometry: MeshProperties['geometry']
  export let material: MeshProperties['material']

  let previousMaterial = material
  let previousGeometry = geometry

  const { invalidate } = useThrelte()

  export const mesh = new ThreeMesh(geometry, material)
  const getMesh = () => mesh

  $: {
    if (material !== previousMaterial) {
      getMesh().material = material
      invalidate('Mesh: material changed')
    } else {
      invalidate('Mesh: material props changed')
    }
    previousMaterial = material
  }

  $: {
    if (geometry !== previousGeometry) {
      getMesh().geometry = geometry
      invalidate('Mesh: geometry changed')
    } else {
      invalidate('Mesh: geometry props changed')
    }
    previousGeometry = geometry
  }
</script>

<MeshInstance
  {mesh}
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
