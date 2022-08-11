<script lang="ts">
  // All credits to pmndrs team, I only ported it to svelte
  // Reference: https://github.com/pmndrs/drei/blob/master/src/core/SpotLight.tsx
  import { useThrelte, Mesh, useThrelteRoot } from '@threlte/core'
  import type { SpotlightProperties } from '../../types/components'
  import { DepthTexture } from 'three'
  import { CylinderBufferGeometry, Matrix4 } from 'three'
  import SpotLightMaterial from './SpotlightMaterial'

  const { size } = useThrelte()
  const { dpr } = useThrelteRoot()

  // Mesh
  export let position: SpotlightProperties['position'] = undefined
  export let scale: SpotlightProperties['scale'] = undefined
  export let rotation: SpotlightProperties['rotation'] = undefined
  export let viewportAware: SpotlightProperties['viewportAware'] = false
  export let inViewport: SpotlightProperties['inViewport'] = false
  export let castShadow: SpotlightProperties['castShadow'] = undefined
  export let receiveShadow: SpotlightProperties['receiveShadow'] = undefined
  export let frustumCulled: SpotlightProperties['frustumCulled'] = undefined
  export let renderOrder: SpotlightProperties['renderOrder'] = undefined
  export let visible: SpotlightProperties['visible'] = undefined
  export let userData: SpotlightProperties['userData'] = undefined
  export let dispose: SpotlightProperties['dispose'] = undefined
  export let interactive: SpotlightProperties['interactive'] = false
  export let ignorePointer: SpotlightProperties['ignorePointer'] = false
  export let lookAt: SpotlightProperties['lookAt'] = undefined

  // self

  export let depthBuffer: SpotlightProperties['depthBuffer'] = new DepthTexture(
    $size.width * $dpr,
    $size.height * $dpr
  )
  export let opacity: SpotlightProperties['opacity'] = 1
  export let attenuation: SpotlightProperties['attenuation'] = 5
  export let anglePower: SpotlightProperties['anglePower'] = 5
  export let color: SpotlightProperties['color'] = 'white'
  export let cameraNear: SpotlightProperties['cameraNear'] = 0.1
  export let cameraFar: SpotlightProperties['cameraFar'] = 10
  export let resolution: SpotlightProperties['resolution'] = depthBuffer
    ? [$size.width * $dpr, $size.height * $dpr]
    : [0, 0]
  export let distance: SpotlightProperties['distance'] = 5
  export let angle: SpotlightProperties['angle'] = 0.15
  export let radiusTop: SpotlightProperties['radiusTop'] = 0.1
  export let radiusBottom: SpotlightProperties['radiusBottom'] = angle ? angle * 7 : 1.05

  const material = new SpotLightMaterial()

  material.uniforms.depth.value = depthBuffer
  material.uniforms.opacity.value = opacity
  material.uniforms.attenuation.value = attenuation
  material.uniforms.anglePower.value = anglePower
  // material.uniforms.spotPosition.value = position // Need help with this
  material.uniforms.lightColor.value = color
  material.uniforms.cameraNear.value = cameraNear
  material.uniforms.cameraFar.value = cameraFar
  material.uniforms.resolution.value = resolution

  const geometry = new CylinderBufferGeometry(radiusTop, radiusBottom, distance, 128, 64, true) // Should these magic numbers be exported as props?
  geometry.applyMatrix4(new Matrix4().makeTranslation(0, -distance / 2, 0))
  geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
</script>

<Mesh
  {geometry}
  {material}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {visible}
  {userData}
  {dispose}
  {interactive}
  {ignorePointer}
  on:click
  on:contextmenu
  on:pointerup
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Mesh>
