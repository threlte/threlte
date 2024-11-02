<script lang="ts">
  import type { AsciiRendererProps } from './types'
  import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
  import { observe, useTask, useThrelte } from '@threlte/core'

  let {
    autoRender = true,
    bgColor = '#000000',
    characters = ' .:-+*=%@#',
    fgColor = '#ffffff',
    options = {}
  }: AsciiRendererProps = $props()

  const { autoRender: threlteAutoRender, camera, renderer, renderStage, scene, size } = useThrelte()

  let asciiEffect = $derived.by(() => {
    const effect = new AsciiEffect(renderer, characters, options)
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  })

  $effect.pre(() => {
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

  const { start, stop, started } = useTask(
    () => {
      asciiEffect.render(scene, camera.current)
    },
    { autoInvalidate: false, autoStart: false, stage: renderStage }
  )

  $effect(() => {
    let before = threlteAutoRender.current
    threlteAutoRender.set(false)
    return () => {
      // be sure to turn off the task if the component is destroyed
      if ($started) {
        stop()
      }
      threlteAutoRender.set(before)
    }
  })

  observe.pre(
    () => [autoRender],
    ([autoRender]) => {
      if (autoRender) {
        if (!$started) {
          start()
        }
      } else {
        if ($started) {
          stop()
        }
      }
    }
  )
</script>
