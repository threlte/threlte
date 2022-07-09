<script lang="ts">
  import { Object3D, SpotLight as ThreeSpotLight } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
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
  export let visible: SpotLightProperties['visible'] = undefined
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

  const { invalidate } = useThrelte()

  export const light = new ThreeSpotLight(color, intensity)

  const originalTarget = light.target

  const { start, stop, started } = useFrame(() => {}, {
    autostart: false,
    debugFrameloopMessage: 'SpotLight: tracking target'
  })

  const updateLightTarget = (target: SpotLightProperties['target']) => {
    if (target && target instanceof Object3D && !$started) {
      light.target = target
      start()
      invalidate('SpotLight: target changed')
    } else if ((!target || !(target instanceof Object3D)) && $started) {
      light.target = originalTarget
      stop()
      invalidate('SpotLight: target changed')
    }
  }

  $: updateLightTarget(target)

  const updateLightShadow = (shadow: SpotLightProperties['shadow']) => {
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

  $: updateLightShadow(shadow)

  $: {
    if (distance !== undefined) light.distance = distance
    if (decay !== undefined) light.decay = decay
    if (angle !== undefined) light.angle = angle
    if (penumbra !== undefined) light.penumbra = penumbra
    if (power !== undefined) light.power = power
    invalidate('SpotLight: props changed')
  }
</script>

{#if target && !(target instanceof Object3D)}
  <SceneGraphObject object={originalTarget} />
  <TransformableObject object={originalTarget} position={target} />
{/if}

<LightInstance
  {light}
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
