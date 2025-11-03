<script lang="ts">
  import { observe, T, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import {
    CubeCamera,
    HalfFloatType,
    LinearMipmapLinearFilter,
    MathUtils,
    Vector3,
    WebGLCubeRenderTarget
  } from 'three'
  import { Sky } from 'three/examples/jsm/objects/Sky.js'
  import type { SkyProps } from './types.js'

  let {
    scale = 1000,
    turbidity = 10,
    rayleigh = 3,
    mieCoefficient = 0.005,
    mieDirectionalG = 0.7,
    elevation = 2,
    azimuth = 180,
    setEnvironment = true,
    cubeMapSize = 128,
    webGLRenderTargetOptions = {},
    ref = $bindable(),
    children,
    ...props
  }: SkyProps = $props()

  const sky = new Sky()

  const sunPosition = new Vector3()

  const { uniforms } = sky.material

  const { renderer, scene, invalidate } = useThrelte()

  let renderTarget: WebGLCubeRenderTarget | undefined = $state()
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

  $effect.pre(() => {
    if (setEnvironment && renderTarget) {
      scene.environment = renderTarget.texture
      invalidate()
    } else if (!setEnvironment) {
      scene.environment = originalEnvironment
      invalidate()
    }
  })

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
        cubeCamera?.update(renderer, sky)
      }

      invalidate()
      stop()
    },
    {
      autoStart: false,
      autoInvalidate: false
    }
  )

  observe.pre(
    () => [scale, turbidity, rayleigh, mieCoefficient, mieDirectionalG, elevation, azimuth],
    () => scheduleUpdate()
  )

  onDestroy(() => {
    sky.material.dispose()
    scene.environment = originalEnvironment
    try {
      renderTarget?.dispose()
    } catch (error) {
      console.warn('Could not dispose renderTarget:', error)
    }
  })
</script>

<T
  is={sky}
  bind:ref
  {...props}
>
  {@render children?.({ ref: sky, sunPosition, renderTarget })}
</T>
