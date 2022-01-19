<script lang="ts">
  import { DirectionalLight as ThreeDirectionalLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import type { DirectionalLightProperties } from '../types/components'

  // LightInstance
  export let position: DirectionalLightProperties['position'] = undefined
  export let scale: DirectionalLightProperties['scale'] = undefined
  export let rotation: DirectionalLightProperties['rotation'] = undefined
  export let lookAt: DirectionalLightProperties['lookAt'] = undefined
  export let receiveShadow: DirectionalLightProperties['receiveShadow'] = undefined
  export let frustumCulled: DirectionalLightProperties['frustumCulled'] = undefined
  export let renderOrder: DirectionalLightProperties['renderOrder'] = undefined
  export let viewportAware: DirectionalLightProperties['viewportAware'] = false
  export let inViewport: DirectionalLightProperties['inViewport'] = false
  export let color: DirectionalLightProperties['color'] = undefined
  export let intensity: DirectionalLightProperties['intensity'] = undefined
  export let shadow: DirectionalLightProperties['shadow'] = undefined

  export const light = new ThreeDirectionalLight(color, intensity)

  const { render } = useThrelte()

  $: {
    if (shadow) {
      const {
        mapSize = [512, 512],
        camera: { left = -5, bottom = -5, right = 5, top = 5, near = 0.5, far = 500 } = {},
        bias = 0,
        radius = 1
      } = shadow === true ? {} : shadow
      light.shadow.mapSize.set(mapSize[0], mapSize[1])
      light.shadow.camera.left = left
      light.shadow.camera.top = top
      light.shadow.camera.right = right
      light.shadow.camera.bottom = bottom
      light.shadow.camera.near = near
      light.shadow.camera.far = far
      light.shadow.bias = bias
      light.shadow.radius = radius
    }
    render('DirectionalLight: shadow changed')
  }
</script>

<LightInstance
  {light}
  {lookAt}
  {position}
  {scale}
  {rotation}
  castShadow={shadow ? true : undefined}
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
