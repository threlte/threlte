<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { untrack } from 'svelte'
  import type { Material } from 'three'
  import { CSM } from 'three/examples/jsm/csm/CSM.js'
  import { cascadeShadowBiases } from './cascadeShadowBiases.js'
  import type { CSMProps } from './types.js'
  import { useMaterials } from './useMaterials.svelte.js'

  let {
    enabled = true,
    camera,
    cascades,
    mode,
    maxFar,
    lightMargin,
    fade,
    lightDirection = [1, -1, 1],
    intensity,
    color,
    shadowMapSize,
    shadowBias,
    shadowNormalBias = 0,
    shadowIntensity = 1,
    shadowRadius = 1,
    shadowBlurSamples = 8,
    shadowNear,
    shadowFar,
    csm = $bindable(),
    args = {},
    configure,
    lightIntensity,
    lightColor,
    children,
    fallback
  }: CSMProps = $props()

  const { camera: defaultCamera, invalidate, scene, size } = useThrelte()

  const resolvedCascades = $derived(cascades ?? args.cascades ?? 3)
  const resolvedMaxFar = $derived(maxFar ?? args.maxFar ?? 100000)
  const resolvedLightMargin = $derived(lightMargin ?? args.lightMargin ?? 200)
  const resolvedShadowMapSize = $derived(shadowMapSize ?? args.shadowMapSize ?? 2048)
  const resolvedShadowBias = $derived(shadowBias ?? args.shadowBias ?? 0.000001)
  const resolvedShadowNear = $derived(shadowNear ?? args.lightNear ?? 1)
  const resolvedShadowFar = $derived(shadowFar ?? args.lightFar ?? 2000)

  const { onNewMaterial, allMaterials } = useMaterials()

  const applyMode = (csm: CSM) => {
    if (mode === undefined) {
      csm.mode = args.mode ?? 'practical'
      if (args.customSplitsCallback !== undefined) {
        csm.customSplitsCallback = args.customSplitsCallback
      }
    } else if (typeof mode === 'function') {
      const splits = mode
      csm.mode = 'custom'
      csm.customSplitsCallback = (cascades, near, far, breaks) => {
        breaks.push(...splits(cascades, near, far))
      }
    } else {
      csm.mode = mode
    }
  }

  $effect(() => {
    if (!enabled) return

    const cascades = resolvedCascades

    return untrack(() => {
      const nextCSM = new CSM({
        ...args,
        camera: camera ?? args.camera ?? defaultCamera.current,
        parent: args.parent ?? scene,
        cascades,
        maxFar: resolvedMaxFar,
        lightMargin: resolvedLightMargin,
        shadowMapSize: resolvedShadowMapSize,
        shadowBias: resolvedShadowBias,
        lightNear: resolvedShadowNear,
        lightFar: resolvedShadowFar
      })

      applyMode(nextCSM)
      configure?.(nextCSM)

      const setupMaterial = (material: Material) => {
        nextCSM.setupMaterial(material)
        material.needsUpdate = true
      }

      for (const material of allMaterials) {
        setupMaterial(material)
      }
      onNewMaterial(setupMaterial)

      csm = nextCSM
      invalidate()

      return () => {
        onNewMaterial(undefined)
        csm = undefined
        nextCSM.remove()
        nextCSM.dispose()
      }
    })
  })

  useTask(() => csm?.update(), { autoInvalidate: false })

  $effect(() => {
    if (csm === undefined) return

    void $size

    csm.camera = camera ?? $defaultCamera
    csm.maxFar = resolvedMaxFar
    if (fade !== undefined) csm.fade = fade
    applyMode(csm)
    csm.updateFrustums()
    invalidate()
  })

  $effect(() => {
    if (csm === undefined) return

    csm.shadowMapSize = resolvedShadowMapSize

    const shadows = csm.lights.map((light) => light.shadow)
    const biases = cascadeShadowBiases(shadows.length, resolvedShadowBias)

    for (const [index, shadow] of shadows.entries()) {
      if (shadow.mapSize.width !== resolvedShadowMapSize) {
        shadow.mapSize.setScalar(resolvedShadowMapSize)
        shadow.map?.dispose()
        shadow.map = null
        shadow.mapPass?.dispose()
        shadow.mapPass = null
      }

      shadow.bias = biases[index]
      shadow.normalBias = shadowNormalBias
      shadow.intensity = shadowIntensity
      shadow.radius = shadowRadius
      shadow.blurSamples = shadowBlurSamples
      shadow.camera.near = resolvedShadowNear
      shadow.camera.far = resolvedShadowFar
      shadow.camera.updateProjectionMatrix()
    }

    invalidate()
  })

  $effect(() => {
    if (csm === undefined) return
    csm.lightMargin = resolvedLightMargin
    invalidate()
  })

  $effect(() => {
    if (csm === undefined) return
    csm.lightDirection.set(...lightDirection).normalize()
    invalidate()
  })

  $effect(() => {
    if (csm === undefined) return

    for (const light of csm.lights) {
      if (intensity !== undefined) {
        light.intensity = intensity
      } else if (lightIntensity !== undefined) {
        light.intensity = lightIntensity / Math.PI
      }

      if (color !== undefined) {
        light.color.set(color)
      } else if (lightColor !== undefined) {
        light.color.set(lightColor)
      }
    }

    invalidate()
  })
</script>

{@render children?.()}

{#if !enabled}
  {@render fallback?.()}
{/if}
