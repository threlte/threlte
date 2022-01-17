<script lang="ts">
  import { useFrame } from '../hooks/useFrame'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import { ColorRepresentation, Object3D, SpotLight, Vector3 } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import { defaults } from '../lib/defaults'
  import type { LookAtProp, PositionProp, RotationProp, ScaleProp } from '../types/types'

  // LightInstance
  export let position: PositionProp = defaults.lights.spotLight.position
  export let scale: ScaleProp = undefined
  export let rotation: RotationProp = undefined
  export let viewportAware: boolean = false
  export let inViewport = defaults.object3d.inViewport
  export let frustumCulled = defaults.mesh.frustumCulled
  export let renderOrder = defaults.mesh.renderOrder
  export let color: ColorRepresentation = defaults.lights.spotLight.color
  export let intensity = defaults.lights.spotLight.intensity
  // prop lookAt replaced with prop target

  // self
  export let angle: number = defaults.lights.spotLight.angle
  export let decay: number = defaults.lights.spotLight.decay
  export let distance: number = defaults.lights.spotLight.distance
  export let penumbra: number = defaults.lights.spotLight.penumbra
  export let power: number | undefined = undefined
  export let target: LookAtProp = undefined

  // self
  export let shadow:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: { near?: number; far?: number }
        bias?: number
        radius?: number
      } = false

  export const light = new SpotLight(color, intensity)
  const originalLightTarget = light.target

  const { render } = useThrelte()

  const tmpV3 = new Vector3()

  const targetIsObject3D = (t: typeof target): t is Object3D => {
    return !!target && target instanceof Object3D
  }

  const { start: startLightTracking, stop: stopLightTracking } = useFrame(
    () => {
      if (targetIsObject3D(target)) {
        target.getWorldPosition(tmpV3)
        light.target.position.copy(tmpV3)
      }
    },
    {
      autostart: false
    }
  )

  $: {
    if (targetIsObject3D(target)) {
      light.target = target
      startLightTracking()
    } else if (!!target) {
      stopLightTracking()
      light.target = originalLightTarget
    }
  }

  $: {
    light.distance = distance
    light.decay = decay
    light.angle = angle
    light.penumbra = penumbra
    if (power) light.power = power
    render('SpotLight: props changed')
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
    render('SpotLight: shadow changed')
  }
</script>

{#if !targetIsObject3D(target)}
  <Object3DInstance
    object={originalLightTarget}
    position={target}
    lookAt={undefined}
    scale={undefined}
    rotation={undefined}
    castShadow={false}
    receiveShadow={false}
    frustumCulled={true}
    renderOrder={0}
    viewportAware={false}
    on:viewportenter
    on:viewportleave
    inViewport={false}
  >
    <slot />
  </Object3DInstance>
{/if}

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
