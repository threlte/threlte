<script lang="ts">
  import { AmbientLight, ColorRepresentation } from 'three'
  import LightInstance from '../instances/LightInstance.svelte'
  import { defaults } from '../lib/defaults'
  import type { Position, Rotation, Scale } from '../types/types'

  // LightInstance
  export let position: Position = defaults.position
  export let scale: Scale = defaults.scale
  export let rotation: Rotation = defaults.rotation
  export let viewportAware: boolean = false
  export let inViewport = defaults.object3d.inViewport
  export let frustumCulled = defaults.mesh.frustumCulled
  export let renderOrder = defaults.mesh.renderOrder
  export let color: ColorRepresentation = defaults.lights.ambientLight.color
  export let intensity = defaults.lights.ambientLight.intensity

  export const light = new AmbientLight(color, intensity)
</script>

<LightInstance
  {light}
  lookAt={undefined}
  {position}
  {scale}
  {rotation}
  castShadow={false}
  receiveShadow={false}
  {frustumCulled}
  {renderOrder}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
  {color}
  {intensity}
>
  <slot />
</LightInstance>
