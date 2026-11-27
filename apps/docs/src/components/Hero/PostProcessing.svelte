<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import {
    BlendFunction,
    BloomEffect,
    BrightnessContrastEffect,
    ChromaticAberrationEffect,
    EffectComposer,
    EffectPass,
    FXAAEffect,
    RenderPass,
    ToneMappingEffect,
    ToneMappingMode
  } from 'postprocessing'
  import { HalfFloatType } from 'three'
  import { StaticNoiseEffect } from './StaticNoise/StaticNoise'
  import { untrack } from 'svelte'

  let {
    bloomIntensity = 2,
    bloomRadius = 0.6,
    bloomLuminanceSmoothing = 0.025,
    brightness = 0,
    contrast = 0,
    noiseIntensity = 0.03
  }: {
    bloomIntensity: number
    bloomRadius: number
    bloomLuminanceSmoothing: number
    brightness: number
    contrast: number
    noiseIntensity: number
  } = $props()

  /**
   * Chromatic Aberration
   */
  const chromaticAberrationEffect = new ChromaticAberrationEffect()
  chromaticAberrationEffect.offset.set(0.0008, 0)

  /**
   * Tone Mapping
   */
  const toneMappingEffect = new ToneMappingEffect({
    mode: ToneMappingMode.ACES_FILMIC
  })

  /**
   * Noise
   */
  const noiseEffect = new StaticNoiseEffect({
    blendFunction: BlendFunction.COLOR_DODGE
  })

  $effect(() => {
    noiseEffect.blendMode.opacity.value = noiseIntensity
  })

  /**
   * Anti-aliasing
   */
  const fxaaEffect = new FXAAEffect()

  /**
   * Bloom
   */
  const bloomEffect = new BloomEffect({
    mipmapBlur: true,
    luminanceThreshold: 0.5,
    radius: 0.6,
    intensity: 2
  })

  $effect.pre(() => {
    bloomEffect.intensity = bloomIntensity
    bloomEffect.mipmapBlurPass.radius = bloomRadius
    bloomEffect.luminanceMaterial.smoothing = bloomLuminanceSmoothing
  })

  /**
   * Brightness/Contrast
   */
  const bcEffect = new BrightnessContrastEffect()

  $effect.pre(() => {
    bcEffect.contrast = contrast
    bcEffect.brightness = brightness
  })

  const { renderer, size, scene, camera, autoRender, renderStage } = useThrelte()

  const composer = new EffectComposer(renderer, {
    alpha: true,
    frameBufferType: HalfFloatType
  })

  $effect(() => {
    composer.addPass(new RenderPass(scene.current, camera.current))
    composer.addPass(new EffectPass(camera.current, fxaaEffect))
    composer.addPass(
      new EffectPass(camera.current, noiseEffect, bcEffect, bloomEffect, toneMappingEffect)
    )

    return () => {
      composer.removeAllPasses()
    }
  })

  // When using PostProcessing, we need to disable autoRender
  $effect(() => {
    let before = untrack(() => autoRender.current)
    autoRender.set(false)
    return () => {
      autoRender.set(before)
    }
  })

  useTask(
    () => {
      composer.render()
    },
    { stage: renderStage, autoInvalidate: false }
  )

  $effect(() => {
    composer.setSize(size.current.width, size.current.height)
  })
</script>
