<script lang="ts">
  import { AmbientLight as ThreeAmbientLight } from 'three'
  import LightInstance from '../instances/LightInstance.svelte'
  import type { AmbientLightProps } from '../types/components'

  export let position: AmbientLightProps['position'] = undefined
  export let scale: AmbientLightProps['scale'] = undefined
  export let rotation: AmbientLightProps['rotation'] = undefined
  export let lookAt: AmbientLightProps['lookAt'] = undefined
  export let castShadow: AmbientLightProps['castShadow'] = undefined
  export let receiveShadow: AmbientLightProps['receiveShadow'] = undefined
  export let frustumCulled: AmbientLightProps['frustumCulled'] = undefined
  export let renderOrder: AmbientLightProps['renderOrder'] = undefined
  export let viewportAware: AmbientLightProps['viewportAware'] = false
  export let inViewport: AmbientLightProps['inViewport'] = false
  export let color: AmbientLightProps['color'] = undefined
  export let intensity: AmbientLightProps['intensity'] = undefined

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
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
  {color}
  {intensity}
>
  <slot />
</LightInstance>
