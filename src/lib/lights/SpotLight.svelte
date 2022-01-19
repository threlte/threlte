<script lang="ts">
  import { Object3D, SpotLight as ThreeSpotLight, Vector3 } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { SpotLightProperties } from '../types/components'

  // LightInstance
  export let position: SpotLightProperties['position'] = undefined
  export let scale: SpotLightProperties['scale'] = undefined
  export let rotation: SpotLightProperties['rotation'] = undefined
  export let viewportAware: SpotLightProperties['viewportAware'] = false
  export let inViewport: SpotLightProperties['inViewport'] = false
  export let frustumCulled: SpotLightProperties['frustumCulled'] = undefined
  export let receiveShadow: SpotLightProperties['receiveShadow'] = undefined
  export let renderOrder: SpotLightProperties['renderOrder'] = undefined
  export let color: SpotLightProperties['color'] = undefined
  export let intensity: SpotLightProperties['intensity'] = undefined

  // self
  export let angle: SpotLightProperties['angle'] = undefined
  export let decay: SpotLightProperties['decay'] = undefined
  export let distance: SpotLightProperties['distance'] = undefined
  export let penumbra: SpotLightProperties['penumbra'] = undefined
  export let power: SpotLightProperties['power'] = undefined
  export let target: SpotLightProperties['target'] = undefined
  export let shadow: SpotLightProperties['shadow'] = undefined

  export const light = new ThreeSpotLight(color, intensity)
  const originalLightTarget = light.target

  const { invalidate } = useThrelte()

  const tmpV3 = new Vector3()

  const targetIsObject3D = (t: typeof target): t is Object3D => {
    return !!t && t instanceof Object3D
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
    if (distance !== undefined) light.distance = distance
    if (decay !== undefined) light.decay = decay
    if (angle !== undefined) light.angle = angle
    if (penumbra !== undefined) light.penumbra = penumbra
    if (power !== undefined) light.power = power
    invalidate('SpotLight: props changed')
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
    invalidate('SpotLight: shadow changed')
  }
</script>

{#if !targetIsObject3D(target)}
  <Object3DInstance
    object={originalLightTarget}
    position={target}
    lookAt={undefined}
    scale={undefined}
    rotation={undefined}
    castShadow={undefined}
    receiveShadow={undefined}
    frustumCulled={undefined}
    renderOrder={undefined}
    viewportAware={false}
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
