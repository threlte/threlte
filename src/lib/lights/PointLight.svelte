<script lang="ts">
  import { PointLight as ThreePointLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import type { PointLightProperties } from '../types/components'

  export let position: PointLightProperties['position']
  export let scale: PointLightProperties['scale']
  export let rotation: PointLightProperties['rotation']
  export let lookAt: PointLightProperties['lookAt']
  export let receiveShadow: PointLightProperties['receiveShadow']
  export let viewportAware: PointLightProperties['viewportAware']
  export let inViewport: PointLightProperties['inViewport']
  export let frustumCulled: PointLightProperties['frustumCulled']
  export let renderOrder: PointLightProperties['renderOrder']
  export let intensity: PointLightProperties['intensity']
  export let color: PointLightProperties['color']
  export let distance: PointLightProperties['distance']
  export let decay: PointLightProperties['decay']
  export let power: PointLightProperties['power']
  export let shadow: PointLightProperties['shadow']

  export const light = new ThreePointLight(color, intensity, distance, decay)

  const { render } = useThrelte()

  $: {
    if (distance !== undefined) light.distance = distance
    if (decay !== undefined) light.decay = decay
    if (power !== undefined) light.power = power
    render('PointLight: props changed')
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
    render('PointLight: shadow changed')
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
