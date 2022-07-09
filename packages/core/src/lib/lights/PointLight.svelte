<script lang="ts">
  import { PointLight as ThreePointLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import type { PointLightProperties } from '../types/components'

  export let position: PointLightProperties['position'] = undefined
  export let scale: PointLightProperties['scale'] = undefined
  export let rotation: PointLightProperties['rotation'] = undefined
  export let lookAt: PointLightProperties['lookAt'] = undefined
  export let receiveShadow: PointLightProperties['receiveShadow'] = undefined
  export let viewportAware: PointLightProperties['viewportAware'] = false
  export let inViewport: PointLightProperties['inViewport'] = false
  export let frustumCulled: PointLightProperties['frustumCulled'] = undefined
  export let renderOrder: PointLightProperties['renderOrder'] = undefined
  export let visible: PointLightProperties['visible'] = undefined
  export let intensity: PointLightProperties['intensity'] = undefined
  export let color: PointLightProperties['color'] = undefined
  export let distance: PointLightProperties['distance'] = undefined
  export let decay: PointLightProperties['decay'] = undefined
  export let power: PointLightProperties['power'] = undefined
  export let shadow: PointLightProperties['shadow'] = undefined

  export const light = new ThreePointLight(color, intensity, distance, decay)

  const { invalidate } = useThrelte()

  $: {
    if (distance !== undefined) light.distance = distance
    if (decay !== undefined) light.decay = decay
    if (power !== undefined) light.power = power
    invalidate('PointLight: props changed')
  }

  $: {
    if (shadow) {
      const {
        mapSize = [512, 512],
        camera: { near = 0.5, far = 500 } = {},
        bias = 0,
        radius = 1
      } = shadow === true ? {} : shadow
      light.shadow.mapSize.set(mapSize[0], mapSize[1])
      light.shadow.camera.near = near
      light.shadow.camera.far = far
      light.shadow.bias = bias
      light.shadow.radius = radius
    }
    invalidate('PointLight: shadow changed')
  }
</script>

<LightInstance
  {light}
  {lookAt}
  {position}
  {scale}
  {rotation}
  castShadow={shadow ? true : false}
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
