<script lang="ts">
  import { AmbientLight as ThreeAmbientLight } from 'three'
  import LightInstance from '../instances/LightInstance.svelte'
  import type { AmbientLightProperties } from '../types/components'

  export let position: AmbientLightProperties['position'] = undefined
  export let scale: AmbientLightProperties['scale'] = undefined
  export let rotation: AmbientLightProperties['rotation'] = undefined
  export let lookAt: AmbientLightProperties['lookAt'] = undefined
  export let castShadow: AmbientLightProperties['castShadow'] = undefined
  export let receiveShadow: AmbientLightProperties['receiveShadow'] = undefined
  export let frustumCulled: AmbientLightProperties['frustumCulled'] = undefined
  export let renderOrder: AmbientLightProperties['renderOrder'] = undefined
  export let visible: AmbientLightProperties['visible'] = undefined
  export let viewportAware: AmbientLightProperties['viewportAware'] = false
  export let inViewport: AmbientLightProperties['inViewport'] = false
  export let color: AmbientLightProperties['color'] = undefined
  export let intensity: AmbientLightProperties['intensity'] = undefined

  export const light = new ThreeAmbientLight(color, intensity)
</script>

<LightInstance
  {light}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {visible}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
  {color}
  {intensity}
>
  <slot />
</LightInstance>
