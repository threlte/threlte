<script lang="ts">
  import type { AsciiRendererProps } from './types'
  import { AsciiEffect } from 'three/examples/jsm/Addons.js'
  import { observe, useTask, useThrelte } from '@threlte/core'
  import { fromStore } from 'svelte/store'

  const defaultCharacters = ' .:-+*=%@#'

  let {
    autoRender = true,
    bgColor = '#000000',
    camera,
    characters = defaultCharacters,
    fgColor = '#ffffff',
    onstart,
    onstop,
    options = {},
    scene,
    children
  }: AsciiRendererProps = $props()

  const {
    autoRender: threlteAutoRender,
    camera: defaultCamera,
    renderStage,
    renderer,
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

  const sizeStore = fromStore(size)

  $effect.pre(() => {
    asciiEffect.setSize(sizeStore.current.width, sizeStore.current.height)
  })

  $effect.pre(() => {
    asciiEffect.domElement.style.color = fgColor
  })

  $effect.pre(() => {
    asciiEffect.domElement.style.backgroundColor = bgColor
  })

  $effect(() => {
    renderer.domElement.style.opacity = '0'
    const last = asciiEffect.domElement
    renderer.domElement.parentNode?.appendChild(last)
    return () => {
      renderer.domElement.style.opacity = '1'
      renderer.domElement.parentNode?.removeChild(last)
    }
  })

  const { start: startRendering, stop: stopRendering } = useTask(
    () => {
      asciiEffect.render(scene ?? defaultScene, camera ?? defaultCamera.current)
    },
    { autoInvalidate: false, autoStart: false, stage: renderStage }
  )

  export const start = () => {
    startRendering()
    onstart?.()
  }

  export const stop = () => {
    stopRendering()
    onstop?.()
  }

  observe.pre(
    () => [autoRender],
    ([autoRender]) => {
      if (autoRender) {
        start()
      } else {
        stop()
      }
    }
  )

  $effect(() => {
    let lastAutoRender = threlteAutoRender.current
    threlteAutoRender.set(autoRender)
    return () => {
      threlteAutoRender.set(lastAutoRender)
      // be sure to turn off the task if the component is destroyed
      stop()
    }
  })
</script>

{@render children?.({ asciiEffect })}
