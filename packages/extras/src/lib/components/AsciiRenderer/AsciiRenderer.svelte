<script lang="ts">
  import type { AsciiEffectProps } from './AsciiRenderer'
  import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
  import { useTask, useThrelte } from '@threlte/core'

  let {
    characters = ' .:-+*=%@#',
    bgColor = '#000000',
    fgColor = '#ffffff',
    options = {}
  }: AsciiEffectProps = $props()

  const { autoRender, camera, renderer, renderStage, scene, size } = useThrelte()

  let asciiEffect = $derived.by(() => {
    const effect = new AsciiEffect(renderer, characters, options)
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  })

  $effect.pre(() => {
    options.resolution
    asciiEffect.setSize($size.width, $size.height)
  })

  $effect.pre(() => {
    asciiEffect.domElement.style.color = fgColor
  })

  $effect.pre(() => {
    asciiEffect.domElement.style.backgroundColor = bgColor
  })

  $effect(() => {
    renderer.domElement.style.opacity = '0'
    renderer.domElement.parentNode?.appendChild(asciiEffect.domElement)
    const last = asciiEffect.domElement
    return () => {
      renderer.domElement.style.opacity = '1'
      renderer.domElement.parentNode?.removeChild(last)
    }
  })

  $effect(() => {
    let before = autoRender.current
    autoRender.set(false)
    return () => {
      autoRender.set(before)
    }
  })

  useTask(
    () => {
      asciiEffect.render(scene, camera.current)
    },
    { autoInvalidate: false, stage: renderStage }
  )
</script>
