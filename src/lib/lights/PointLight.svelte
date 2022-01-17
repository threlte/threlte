<script lang="ts">
  import type { ColorRepresentation } from 'three'
  import { PointLight } from 'three'
  import LightInstance from '../instances/LightInstance.svelte'
  import { defaults } from '../lib/defaults'
  import type { PositionProp, RotationProp, ScaleProp } from '../types/types'
  import { useThrelte } from '../hooks/useThrelte'

  // LightInstance
  export let position: PositionProp | undefined = undefined
  export let scale: ScaleProp | undefined = undefined
  export let rotation: RotationProp | undefined = undefined
  export let viewportAware: boolean = false
  export let inViewport = defaults.object3d.inViewport
  export let frustumCulled = defaults.mesh.frustumCulled
  export let renderOrder = defaults.mesh.renderOrder
  export let color: ColorRepresentation = defaults.lights.ambientLight.color
  export let intensity = defaults.lights.ambientLight.intensity

  // self
  export let distance = defaults.lights.pointLight.distance
  export let decay = defaults.lights.pointLight.decay
  export let power: number | undefined = undefined
  export let shadow:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: { near?: number; far?: number }
        bias?: number
        radius?: number
      } = false

  export const light = new PointLight(color, intensity, distance, decay)

  const { render } = useThrelte()

  $: {
    light.distance = distance
    light.decay = decay
    if (power) light.power = power
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
  lookAt={undefined}
  {position}
  {scale}
  {rotation}
  castShadow={!!shadow}
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
