<script lang="ts">
  // All credits to pmndrs team, I only ported it to svelte
  // Reference: https://github.com/pmndrs/drei/blob/master/src/core/SpotLight.tsx
  import { useThrelte, Mesh, useThrelteRoot } from '@threlte/core'
  import type { VolumetricSpotlightProperties } from '../../types/components'
  import { DepthTexture } from 'three'
  import { CylinderBufferGeometry, Matrix4 } from 'three'
  import VolumetricSpotlightMaterial from './VolumetricSpotlightMaterial'
  import { Color } from 'three'
  import { SpotLight, type SpotLightProperties } from '@threlte/core'

  const { size } = useThrelte()
  const { dpr } = useThrelteRoot()

  // Mesh
  export let position: VolumetricSpotlightProperties['position'] = undefined
  export let scale: VolumetricSpotlightProperties['scale'] = undefined
  export let rotation: VolumetricSpotlightProperties['rotation'] = undefined
  export let viewportAware: VolumetricSpotlightProperties['viewportAware'] = false
  export let inViewport: VolumetricSpotlightProperties['inViewport'] = false
  export let castShadow: VolumetricSpotlightProperties['castShadow'] = undefined
  export let receiveShadow: VolumetricSpotlightProperties['receiveShadow'] = undefined
  export let frustumCulled: VolumetricSpotlightProperties['frustumCulled'] = undefined
  export let renderOrder: VolumetricSpotlightProperties['renderOrder'] = undefined
  export let visible: VolumetricSpotlightProperties['visible'] = undefined
  export let userData: VolumetricSpotlightProperties['userData'] = undefined
  export let dispose: VolumetricSpotlightProperties['dispose'] = undefined
  export let interactive: VolumetricSpotlightProperties['interactive'] = false
  export let ignorePointer: VolumetricSpotlightProperties['ignorePointer'] = false
  export let lookAt: VolumetricSpotlightProperties['lookAt'] = undefined

  // self

  export let depthBuffer: VolumetricSpotlightProperties['depthBuffer'] = new DepthTexture(
    // $size.width * $dpr,
    // $size.height * $dpr
    512,
    512
  )
  export let opacity: VolumetricSpotlightProperties['opacity'] = 1
  export let attenuation: VolumetricSpotlightProperties['attenuation'] = 5
  export let anglePower: VolumetricSpotlightProperties['anglePower'] = 5
  export let color: VolumetricSpotlightProperties['color'] = 'white'
  export let cameraNear: VolumetricSpotlightProperties['cameraNear'] = 0.1
  export let cameraFar: VolumetricSpotlightProperties['cameraFar'] = 10
  export let resolution: VolumetricSpotlightProperties['resolution'] = [0, 0]
  export let distance: VolumetricSpotlightProperties['distance'] = 5
  export let angle: VolumetricSpotlightProperties['angle'] = 0.15
  export let radiusTop: VolumetricSpotlightProperties['radiusTop'] = 0.1
  export let radiusBottom: VolumetricSpotlightProperties['radiusBottom'] = angle ? angle * 7 : 1

  // Light
  export let intensity: SpotLightProperties['intensity'] = 1
  export let decay: SpotLightProperties['decay'] = undefined
  export let penumbra: SpotLightProperties['penumbra'] = 1
  export let power: SpotLightProperties['power'] = undefined
  export let target: SpotLightProperties['target'] = undefined
  export let shadow: SpotLightProperties['shadow'] = undefined

  const material = new VolumetricSpotlightMaterial()

  material.uniforms.depth.value = depthBuffer
  material.uniforms.opacity.value = opacity
  material.uniforms.attenuation.value = attenuation
  material.uniforms.anglePower.value = anglePower

  material.uniforms.spotPosition.value = position

  material.uniforms.lightColor.value = new Color(color)
  material.uniforms.cameraNear.value = cameraNear
  material.uniforms.cameraFar.value = cameraFar
  material.uniforms.resolution.value = resolution

  const geometry = new CylinderBufferGeometry(radiusTop, radiusBottom, distance, 128, 64, true) // Should these magic numbers be exported as props?
  // geometry.applyMatrix4(new Matrix4().makeTranslation(0, -distance / 2, 0))
  // geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
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
  <SpotLight
    {color}
    shadow
    {intensity}
    {angle}
    {decay}
    distance={distance * 2}
    {penumbra}
    {power}
    {target}
  />
</Mesh>
