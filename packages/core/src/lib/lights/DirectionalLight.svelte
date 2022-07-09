<script lang="ts">
  import { useFrame } from '../hooks/useFrame'
  import { DirectionalLight as ThreeDirectionalLight, Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import LightInstance from '../instances/LightInstance.svelte'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import type { DirectionalLightProperties } from '../types/components'

  export let position: DirectionalLightProperties['position'] = undefined
  export let scale: DirectionalLightProperties['scale'] = undefined
  export let rotation: DirectionalLightProperties['rotation'] = undefined
  export let receiveShadow: DirectionalLightProperties['receiveShadow'] = undefined
  export let frustumCulled: DirectionalLightProperties['frustumCulled'] = undefined
  export let renderOrder: DirectionalLightProperties['renderOrder'] = undefined
  export let visible: DirectionalLightProperties['visible'] = undefined
  export let viewportAware: DirectionalLightProperties['viewportAware'] = false
  export let inViewport: DirectionalLightProperties['inViewport'] = false
  export let color: DirectionalLightProperties['color'] = undefined
  export let intensity: DirectionalLightProperties['intensity'] = undefined
  export let shadow: DirectionalLightProperties['shadow'] = undefined
  export let target: DirectionalLightProperties['target'] = undefined

  export const light = new ThreeDirectionalLight(color, intensity)

  const { invalidate } = useThrelte()

  const originalTarget = light.target

  const { start, stop, started } = useFrame(() => {}, {
    autostart: false,
    debugFrameloopMessage: 'DirectionalLight: tracking target'
  })

  const updateLightTarget = (target: DirectionalLightProperties['target']) => {
    if (target && target instanceof Object3D && !$started) {
      light.target = target
      start()
      invalidate('DirectionalLight: target changed')
    } else if ((!target || !(target instanceof Object3D)) && $started) {
      light.target = originalTarget
      stop()
      invalidate('DirectionalLight: target changed')
    }
  }

  $: updateLightTarget(target)

  const updateLightShadow = (shadow: DirectionalLightProperties['shadow']) => {
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
    invalidate('DirectionalLight: shadow changed')
  }

  $: updateLightShadow(shadow)
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
