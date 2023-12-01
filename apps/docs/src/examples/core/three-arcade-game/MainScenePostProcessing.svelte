<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import {
    BloomEffect,
    BrightnessContrastEffect,
    ChromaticAberrationEffect,
    EffectComposer,
    EffectPass,
    KernelSize,
    RenderPass,
    SMAAEffect,
    SMAAPreset
  } from 'postprocessing'
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { Vector2 } from 'three'
  import { gameState } from './game/state'

  const ctx = useThrelte()

  const { state, arcadeMachineScene } = gameState
  const { camera, renderer } = ctx

  let bloomEffect: BloomEffect | undefined = undefined

  const bloomIntensity = tweened($state === 'off' ? 0 : 1, {
    duration: 3e3
  })
  $: bloomIntensity.set($state === 'off' ? 0 : 1)
  $: if (bloomEffect) bloomEffect.intensity = $bloomIntensity

  const composer = new EffectComposer(renderer)

  const addComposerAndPasses = () => {
    composer.removeAllPasses()

    composer.addPass(new RenderPass($arcadeMachineScene, $camera))
    bloomEffect = new BloomEffect({
      intensity: $bloomIntensity,
      luminanceThreshold: 0.15,
      height: 512,
      width: 512,
      luminanceSmoothing: 0.08,
      mipmapBlur: true,
      kernelSize: KernelSize.MEDIUM
    })
    bloomEffect.luminancePass.enabled = true
    ;(bloomEffect as any).ignoreBackground = true
    composer.addPass(new EffectPass($camera, bloomEffect))
    composer.addPass(
      new EffectPass(
        $camera,
        new ChromaticAberrationEffect({
          offset: new Vector2(0.0005, 0.0005),
          modulationOffset: 0,
          radialModulation: false
        })
      )
    )
    composer.addPass(
      new EffectPass(
        $camera,
        new BrightnessContrastEffect({
          brightness: 0,
          contrast: 0.1
        })
      )
    )
    composer.addPass(
      new EffectPass(
        $camera,
        new SMAAEffect({
          preset: SMAAPreset.LOW
        })
      )
    )
  }

  $: if ($camera && $arcadeMachineScene) {
    addComposerAndPasses()
  }

  // When using PostProcessing, we need to disable autoRender
  onMount(() => {
    let before = ctx.autoRender.current
    ctx.autoRender.set(false)
    return () => {
      ctx.autoRender.set(before)
      composer.removeAllPasses()
    }
  })

  useTask(
    (delta) => {
      composer.render(delta)
    },
    { stage: ctx.renderStage }
  )
</script>
