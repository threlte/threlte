<script lang="ts">
  import { Mesh as ThreeMesh } from 'three'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import type { MeshProps } from '../types/components'

  // MeshInstance
  export let position: MeshProps['position'] = undefined
  export let scale: MeshProps['scale'] = undefined
  export let rotation: MeshProps['rotation'] = undefined
  export let viewportAware: MeshProps['viewportAware'] = false
  export let inViewport: MeshProps['inViewport'] = false
  export let castShadow: MeshProps['castShadow'] = undefined
  export let receiveShadow: MeshProps['receiveShadow'] = undefined
  export let frustumCulled: MeshProps['frustumCulled'] = undefined
  export let renderOrder: MeshProps['renderOrder'] = undefined
  export let interactive: MeshProps['interactive'] = false
  export let ignorePointer: MeshProps['ignorePointer'] = false
  export let lookAt: MeshProps['lookAt'] = undefined

  // self
  export let geometry: MeshProps['geometry']
  export let material: MeshProps['material']

  export const mesh = new ThreeMesh(geometry, material)
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
