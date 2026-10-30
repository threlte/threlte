<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core/webgpu'
  import { untrack } from 'svelte'
  import { CSMShadowNode } from 'three/examples/jsm/csm/CSMShadowNode.js'
  import { DirectionalLight } from 'three/webgpu'
  import { cascadeShadowBiases } from '../cascadeShadowBiases.js'
  import type { CSMWebGPUProps } from './types.js'

  let {
    enabled = true,
    camera,
    cascades = 3,
    mode = 'practical',
    maxFar = 100000,
    lightMargin = 200,
    fade = false,
    lightDirection = [1, -1, 1],
    intensity = 3,
    color = 0xffffff,
    shadowMapSize = 2048,
    shadowBias = 0.000001,
    shadowNormalBias = 0,
    shadowIntensity = 1,
    shadowRadius = 1,
    shadowBlurSamples = 8,
    shadowNear = 1,
    shadowFar = 2000,
    csm = $bindable(),
    children,
    fallback
  }: CSMWebGPUProps = $props()

  const { camera: defaultCamera, invalidate, size } = useThrelte()

  let light = $state.raw<DirectionalLight>()
  let frustumsNeedUpdate = false
  let cascadeShadowsNeedUpdate = false

  $effect(() => {
    if (!enabled) return

    const cascadeCount = cascades
    const fadeCascades = fade

    return untrack(() => {
      const nextLight = new DirectionalLight()
      nextLight.castShadow = true

      const node = new CSMShadowNode(nextLight, {
        cascades: cascadeCount,
        maxFar,
        lightMargin
      })
      node.fade = fadeCascades
      nextLight.shadow.shadowNode = node

      light = nextLight
      csm = node
      invalidate()

      return () => {
        light = undefined
        csm = undefined
        node.dispose()
        nextLight.dispose()
      }
    })
  })

  $effect(() => {
    light?.position
      .set(...lightDirection)
      .normalize()
      .negate()
    invalidate()
  })

  $effect(() => {
    if (csm === undefined) return

    if (typeof mode === 'function') {
      const splits = mode
      csm.mode = 'custom'
      csm.customSplitsCallback = (cascades, near, far, breaks) => {
        breaks.push(...splits(cascades, near, far))
      }
    } else {
      csm.mode = mode
    }

    csm.maxFar = maxFar
    frustumsNeedUpdate = true
    invalidate()
  })

  $effect(() => {
    if (csm === undefined) return
    csm.lightMargin = lightMargin
    invalidate()
  })

  $effect(() => {
    if (light === undefined) return

    light.shadow.mapSize.setScalar(shadowMapSize)
    light.shadow.bias = shadowBias
    light.shadow.normalBias = shadowNormalBias
    light.shadow.intensity = shadowIntensity
    light.shadow.radius = shadowRadius
    light.shadow.blurSamples = shadowBlurSamples
    light.shadow.camera.near = shadowNear
    light.shadow.camera.far = shadowFar
    cascadeShadowsNeedUpdate = true
    invalidate()
  })

  $effect(() => {
    void [camera, $defaultCamera, $size]
    frustumsNeedUpdate = true
    invalidate()
  })

  useTask(
    () => {
      if (csm === undefined || csm.camera === null) return

      const nextCamera = camera ?? defaultCamera.current

      if (csm.camera !== nextCamera) {
        csm.camera = nextCamera
        frustumsNeedUpdate = true
      }

      if (frustumsNeedUpdate) {
        frustumsNeedUpdate = false
        csm.updateFrustums()
      }

      if (!cascadeShadowsNeedUpdate) return

      cascadeShadowsNeedUpdate = false

      const shadows = csm.lights.map((cascadeLight) => cascadeLight.shadow)
      const biases = cascadeShadowBiases(shadows.length, shadowBias)

      for (const [index, shadow] of shadows.entries()) {
        if (shadow === undefined) continue

        shadow.mapSize.setScalar(shadowMapSize)
        shadow.bias = biases[index]
        shadow.normalBias = shadowNormalBias
        shadow.intensity = shadowIntensity
        shadow.radius = shadowRadius
        shadow.blurSamples = shadowBlurSamples
        shadow.camera.near = shadowNear
        shadow.camera.far = shadowFar
        shadow.camera.updateProjectionMatrix()
      }
    },
    { autoInvalidate: false }
  )
</script>

{#if light !== undefined}
  <T
    is={light}
    {intensity}
    {color}
  />
{/if}

{@render children?.()}

{#if !enabled}
  {@render fallback?.()}
{/if}
