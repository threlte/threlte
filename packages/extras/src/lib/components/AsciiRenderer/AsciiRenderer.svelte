<script lang="ts">
  import type { AsciiRendererProps } from './types.js'
  import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
  import { fromStore } from 'svelte/store'
  import { useTask, useThrelte } from '@threlte/core'

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
    canvas.style.opacity = '0'
    const last = asciiEffect.domElement
    dom.appendChild(last)
    return () => {
      canvas.style.opacity = '1'
      dom.removeChild(last)
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

  $effect(() => {
    if (!autoRender) {
      return
    }

    start()
    return () => {
      // this should stop the task on unmount as well
      stop()
    }
  })

  $effect(() => {
    const lastAutoRender = threlteAutoRender.current
    threlteAutoRender.set(!autoRender)
    return () => {
      threlteAutoRender.set(lastAutoRender)
    }
  })
</script>

{@render children?.({ asciiEffect })}
