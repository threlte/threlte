<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import {
    CubeCamera,
    HalfFloatType,
    LinearMipmapLinearFilter,
    MathUtils,
    Vector3,
    WebGLCubeRenderTarget,
    type WebGLRenderTargetOptions
  } from 'three'
  import { Sky } from 'three/examples/jsm/objects/Sky'

  /** The scale of the cuboid skybox along every axis, default: 1000 */
  export let scale = 1000
  /** Relative clarity of the sky, default: 10 */
  export let turbidity = 10
  /** Amount of rayleigh scattering, default: 3 */
  export let rayleigh = 3
  /** Mie scattering coefficient, default: 0.005 */
  export let mieCoefficient = 0.005
  /** Mie scattering directionality, default: 0.7 */
  export let mieDirectionalG = 0.7
  /** Elevation angle, default: 2 */
  export let elevation = 2
  /** Azimuthal angle, default: 180 */
  export let azimuth = 180

  /** Render the sky to the scene environment */
  export let setEnvironment = true
  /** The size of the cube map, default: 128 */
  export let cubeMapSize = 128
  /** The options for the WebGLCubeRenderTarget, default: {} */
  export let webGLRenderTargetOptions: WebGLRenderTargetOptions = {}

  const sky = new Sky()
  const sunPosition = new Vector3()

  const uniforms = sky.material.uniforms

  const { renderer, scene, invalidate } = useThrelte()

  let renderTarget: WebGLCubeRenderTarget | undefined
  let cubeCamera: CubeCamera | undefined

  const init = () => {
    renderTarget = new WebGLCubeRenderTarget(cubeMapSize, {
      type: HalfFloatType,
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter,
      ...webGLRenderTargetOptions
    })
    cubeCamera = new CubeCamera(1, 1.1, renderTarget)
  }

  const originalEnvironment = scene.environment

  $: if (setEnvironment && renderTarget) {
    scene.environment = renderTarget.texture
    invalidate()
  } else if (!setEnvironment) {
    scene.environment = originalEnvironment
    invalidate()
  }

  const { start: scheduleUpdate, stop } = useTask(
    () => {
      sky.scale.setScalar(scale)

      uniforms.turbidity.value = turbidity
      uniforms.rayleigh.value = rayleigh
      uniforms.mieCoefficient.value = mieCoefficient
      uniforms.mieDirectionalG.value = mieDirectionalG

      const phi = MathUtils.degToRad(90 - elevation)
      const theta = MathUtils.degToRad(azimuth)

      sunPosition.setFromSphericalCoords(1, phi, theta)
      uniforms.sunPosition.value.copy(sunPosition)

      if (setEnvironment) {
        if (!renderTarget || !cubeCamera) init()
        cubeCamera?.update(renderer, sky as any)
      }

      invalidate()
      stop()
    },
    {
      autoStart: false,
      autoInvalidate: false
    }
  )

  $: scale,
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
    elevation,
    azimuth,
    scheduleUpdate()

  onDestroy(() => {
    sky.material.dispose()
    renderTarget?.dispose()
    scene.environment = originalEnvironment
  })
</script>

<T is={sky}>
  <slot
    {sunPosition}
    {renderTarget}
  />
</T>
