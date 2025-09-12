import { useThrelte } from '@threlte/core'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import type { AsciiEffectOptions } from 'three/examples/jsm/effects/AsciiEffect.js'
import { fromStore } from 'svelte/store'

export const useAsciiEffect = ({
  charSet = () => '',
  options = () => ({})
}: Partial<{
  charSet: () => string
  options: () => AsciiEffectOptions
}> = {}) => {
  const { canvas, dom, renderer, size: sizeStore } = useThrelte()

  const asciiEffect = $derived.by(() => {
    const effect = new AsciiEffect(renderer, charSet(), options())

    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'

    return effect
  })

  const size = fromStore(sizeStore)

  $effect(() => {
    asciiEffect.setSize(size.current.width, size.current.height)
  })

  // asciiEffect.render calls to renderer.render which will draw to the canvas so the canvas's opacity is set to 0
  $effect(() => {
    const last = canvas.style.opacity
    canvas.style.opacity = '0'
    return () => {
      canvas.style.opacity = last
    }
  })

  $effect(() => {
    const last = asciiEffect.domElement
    dom.appendChild(last)
    return () => {
      dom.removeChild(last)
    }
  })

  return {
    get current() {
      return asciiEffect
    }
  }
}
