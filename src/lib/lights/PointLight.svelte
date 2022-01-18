<script lang="ts" context="module">
  export type PointLightProps = {
    position: LightInstanceProps['position']
    scale: LightInstanceProps['scale']
    rotation: LightInstanceProps['rotation']
    lookAt: LightInstanceProps['lookAt']
    receiveShadow: LightInstanceProps['receiveShadow']
    viewportAware: LightInstanceProps['viewportAware']
    inViewport: LightInstanceProps['inViewport']
    frustumCulled: LightInstanceProps['frustumCulled']
    renderOrder: LightInstanceProps['renderOrder']
    intensity: LightInstanceProps['intensity']
    color: LightInstanceProps['color']
    distance: number | undefined
    decay: number | undefined
    power: number | undefined
    shadow:
      | boolean
      | {
          mapSize?: [number, number]
          camera?: { near?: number; far?: number }
          bias?: number
          radius?: number
        }
      | undefined
  }
</script>

<script lang="ts">
  import { PointLight } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import type { LightInstanceProps } from '../instances/LightInstance.svelte'
  import LightInstance from '../instances/LightInstance.svelte'

  export let position: PointLightProps['position']
  export let scale: PointLightProps['scale']
  export let rotation: PointLightProps['rotation']
  export let lookAt: PointLightProps['lookAt']
  export let receiveShadow: PointLightProps['receiveShadow']
  export let viewportAware: PointLightProps['viewportAware']
  export let inViewport: PointLightProps['inViewport']
  export let frustumCulled: PointLightProps['frustumCulled']
  export let renderOrder: PointLightProps['renderOrder']
  export let intensity: PointLightProps['intensity']
  export let color: PointLightProps['color']
  export let distance: PointLightProps['distance']
  export let decay: PointLightProps['decay']
  export let power: PointLightProps['power']
  export let shadow: PointLightProps['shadow']

  export const light = new PointLight(color, intensity, distance, decay)

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
