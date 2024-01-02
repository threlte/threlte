<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import {
    BlendFunction,
    BrightnessContrastEffect,
    ChromaticAberrationEffect,
    EffectComposer,
    EffectPass,
    FXAAEffect,
    RenderPass,
    ToneMappingEffect,
    ToneMappingMode
  } from 'postprocessing'
  import { onMount } from 'svelte'
  import { StaticNoiseEffect } from './StaticNoise/StaticNoise'

  /**
   * Chromatic Aberration
   */
  const chromaticAberrationEffect = new ChromaticAberrationEffect()
  chromaticAberrationEffect.offset.x = 0.0008
  chromaticAberrationEffect.offset.y = 0

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
  noiseEffect.blendMode.opacity.value = 0.03

  /**
   * Anti-aliasing
   */
  const fxaaEffect = new FXAAEffect()

  /**
   * Brightness/Contrast
   */
  const bcEffect = new BrightnessContrastEffect()
  bcEffect.contrast = 0.1

  const { renderer, scene, camera, autoRender, renderStage } = useThrelte()

  const composer = new EffectComposer(renderer)

  const setup = () => {
    composer.removeAllPasses()
    composer.addPass(new RenderPass(scene, camera.current))
    composer.addPass(new EffectPass(camera.current, fxaaEffect))
    composer.addPass(new EffectPass(camera.current, noiseEffect, toneMappingEffect, bcEffect))
  }

  $: $camera && setup()

  // When using PostProcessing, we need to disable autoRender
  onMount(() => {
    let before = autoRender.current
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

  const { size } = useThrelte()
  $: composer.setSize($size.width, $size.height)
</script>
