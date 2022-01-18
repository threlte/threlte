<script lang="ts" context="module">
  export type AmbientLightProps = {
    position: LightInstanceProps['position']
    scale: LightInstanceProps['scale']
    rotation: LightInstanceProps['rotation']
    lookAt: LightInstanceProps['lookAt']
    castShadow: LightInstanceProps['castShadow']
    receiveShadow: LightInstanceProps['receiveShadow']
    viewportAware: LightInstanceProps['viewportAware']
    inViewport: LightInstanceProps['inViewport']
    frustumCulled: LightInstanceProps['frustumCulled']
    renderOrder: LightInstanceProps['renderOrder']
    color: LightInstanceProps['color']
    intensity: LightInstanceProps['intensity']
  }
</script>

<script lang="ts">
  import { AmbientLight } from 'three'
  import LightInstance from '../instances/LightInstance.svelte'
  import type { LightInstanceProps } from '../instances/LightInstance.svelte'

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

  export const light = new AmbientLight(color, intensity)
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
