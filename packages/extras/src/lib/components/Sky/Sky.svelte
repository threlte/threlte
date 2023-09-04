<script lang="ts">
  import { T, useFrame, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import {
    CubeCamera,
    DirectionalLight,
    FloatType,
    Group,
    HalfFloatType,
    LinearMipmapLinearFilter,
    MathUtils,
    Vector3,
    WebGLCubeRenderTarget,
    type WebGLRenderTargetOptions
  } from 'three'
  import { Sky } from 'three/examples/jsm/objects/Sky'

  export let scale: number = 1000
  export let turbidity = 10
  export let rayleigh = 3
  export let mieCoefficient = 0.005
  export let mieDirectionalG = 0.7
  export let elevation = 2
  export let azimuth = 180

  export let cubeMapSize = 128
  export let webGLRenderTargetOptions: WebGLRenderTargetOptions = {}

  const sky = new Sky()
  const sun = new Vector3()

  const uniforms = sky.material.uniforms

  const { renderer, scene } = useThrelte()

  const renderTarget = new WebGLCubeRenderTarget(cubeMapSize, {
    type: HalfFloatType,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
    ...webGLRenderTargetOptions
  })

  const cubeCamera = new CubeCamera(1, 1.1, renderTarget)

  scene.environment = renderTarget.texture

  const isDirectionalLight = (light: any): light is DirectionalLight => light.isDirectionalLight

  const { start: scheduleUpdate, stop } = useFrame(
    ({ invalidate }) => {
      uniforms.turbidity.value = turbidity
      uniforms.rayleigh.value = rayleigh
      uniforms.mieCoefficient.value = mieCoefficient
      uniforms.mieDirectionalG.value = mieDirectionalG

      const phi = MathUtils.degToRad(90 - elevation)
      const theta = MathUtils.degToRad(azimuth)

      sun.setFromSphericalCoords(1, phi, theta)
      uniforms.sunPosition.value.copy(sun)
      cubeCamera.update(renderer, sky as any)

      sunGroup.position.copy(sun)
      if (sunGroup.children.length) {
        const light = sunGroup.children[0]
        if (isDirectionalLight(light)) {
          light.position.copy(sun)
          light.target.position.setFromMatrixPosition(sky.matrixWorld)
        }
      }

      invalidate()
      stop()
    },
    {
      autostart: false
    }
  )

  $: turbidity, rayleigh, mieCoefficient, mieDirectionalG, elevation, azimuth, scheduleUpdate()

  const sunGroup = new Group()

  onDestroy(() => {
    sky.material.dispose()
    renderTarget.dispose()
  })
</script>

<T
  is={sky}
  {scale}
/>

<T is={sunGroup}>
  <slot />
</T>
