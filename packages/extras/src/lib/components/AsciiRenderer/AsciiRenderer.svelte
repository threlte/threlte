<script lang="ts">
  import type { AsciiRendererProps } from './types.js'
  import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
  import { useTask, useThrelte } from '@threlte/core'
  import { untrack } from 'svelte'

  const defaultCharacters = ' .:-+*=%@#'

  let {
    autoRender = true,
    bgColor = '#000000',
    camera,
    characters = defaultCharacters,
    fgColor = '#ffffff',
    options = {},
    scene,
    children
  }: AsciiRendererProps = $props()

  const {
    autoRender: threlteAutoRender,
    camera: defaultCamera,
    renderStage,
    renderer,
    canvas,
    dom,
    scene: defaultScene,
    size
  } = useThrelte()

  // note || instead of ?? handles the case where `characters` === ''
  const charSet = $derived(characters || defaultCharacters)

  const asciiEffect = $derived.by(() => {
    const effect = new AsciiEffect(renderer, charSet, options)
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'

    return effect
  })

  export const getEffect = () => asciiEffect

  $effect.pre(() => {
    asciiEffect.setSize(size.current.width, size.current.height)
  })

  $effect.pre(() => {
    asciiEffect.domElement.style.color = fgColor
  })

  $effect.pre(() => {
    asciiEffect.domElement.style.backgroundColor = bgColor
  })

  $effect(() => {
    canvas.style.opacity = '0'
    const last = asciiEffect.domElement
    dom.appendChild(last)
    return () => {
      canvas.style.opacity = '1'
      dom.removeChild(last)
    }
  })

  useTask(
    () => {
      asciiEffect.render(scene ?? defaultScene, camera ?? defaultCamera.current)
    },
    {
      autoInvalidate: false,
      stage: renderStage,
      running: () => autoRender
    }
  )

  $effect(() => {
    return untrack(() => {
      const lastAutoRender = threlteAutoRender.current
      threlteAutoRender.set(false)
      return () => {
        threlteAutoRender.set(lastAutoRender)
      }
    })
  })
</script>

{@render children?.({ asciiEffect })}
