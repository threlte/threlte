<script lang="ts">
  import MeshInstance from '../instances/MeshInstance.svelte'
  import type { BufferGeometry } from 'three'
  import { Material, Mesh } from 'three'
  import { defaults } from '../lib/defaults'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'

  // MeshInstance
  export let position: Position = defaults.position
  export let scale: Scale = defaults.scale
  export let rotation: Rotation = defaults.rotation
  export let viewportAware: boolean = false
  export let inViewport: boolean = defaults.object3d.inViewport
  export let castShadow: boolean = defaults.mesh.castShadow
  export let receiveShadow: boolean = defaults.mesh.receiveShadow
  export let frustumCulled: boolean = defaults.mesh.frustumCulled
  export let renderOrder: number = defaults.mesh.renderOrder
  export let interactive: boolean = false
  export let ignorePointerEvents: boolean = false
  export let lookAt: LookAt | undefined = undefined

  // self
  export let geometry: BufferGeometry
  export let material: Material | Material[] = defaults.mesh.material()

  export const mesh = new Mesh(geometry, material)
</script>

<MeshInstance
  {lookAt}
  {mesh}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {interactive}
  {ignorePointerEvents}
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
