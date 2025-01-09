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
  import { Tween } from 'svelte/motion'
  import { Vector2 } from 'three'
  import { game } from './game/Game.svelte'

  const { camera, renderer, autoRender, renderStage } = useThrelte()

  let bloomEffect: BloomEffect | undefined = undefined

  let machineIsOff = $derived(game.state === 'off' ? true : false)

  const bloomIntensity = new Tween(0, {
    duration: 3e3
  })

  $effect(() => {
    bloomIntensity.set(machineIsOff ? 0 : 1)
  })
  $effect(() => {
    if (bloomEffect) bloomEffect.intensity = bloomIntensity.current
  })
  $effect(() => {
    if ($camera && game.arcadeMachineScene) {
      addComposerAndPasses()
    }
  })

  const composer = new EffectComposer(renderer)

  const addComposerAndPasses = () => {
    composer.removeAllPasses()

    composer.addPass(new RenderPass(game.arcadeMachineScene, $camera))
    bloomEffect = new BloomEffect({
      intensity: bloomIntensity.current,
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

  // When using PostProcessing, we need to disable autoRender
  onMount(() => {
    let before = autoRender.current
    autoRender.set(false)
    return () => {
      autoRender.set(before)
      composer.removeAllPasses()
    }
  })

  useTask(
    (delta) => {
      composer.render(delta)
    },
    { stage: renderStage }
  )
</script>
