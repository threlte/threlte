import { useThrelte } from '@threlte/core'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import type { AsciiEffectOptions } from 'three/examples/jsm/effects/AsciiEffect.js'
import type { Camera, Scene, WebGLRenderer } from 'three'
import { fromStore } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const KEY = {}

export const useAsciiEffect = (
  getters: Partial<{
    getRenderer: () => WebGLRenderer
    getCharSet: () => string
    getOptions: () => AsciiEffectOptions
    getForegroundColor: () => string
    getBackgroundColor: () => string
  }> = {}
) => {
  const { camera: threlteCamera, canvas, dom, renderer, scene: threlteScene, size } = useThrelte()

  const {
    getRenderer = () => renderer,
    getCharSet = () => '',
    getOptions = () => ({}),
    getForegroundColor = () => 'white',
    getBackgroundColor = () => 'black'
  } = getters

  // save a ref in case it is used in a render loop
  let ref: AsciiEffect
  const asciiEffect = $derived.by(() => {
    const effect = new AsciiEffect(getRenderer(), getCharSet(), getOptions())

    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'

    return (ref = effect)
  })

  const size$ = fromStore(size)

  $effect(() => {
    asciiEffect.setSize(size$.current.width, size$.current.height)
  })

  $effect(() => {
    asciiEffect.domElement.style.color = getForegroundColor()
  })

  $effect(() => {
    asciiEffect.domElement.style.backgroundColor = getBackgroundColor()
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

  return setContext(KEY, {
    get current() {
      return asciiEffect
    },
    render: ({ scene, camera }: Partial<{ scene: Scene; camera: Camera }> = {}) => {
      ref.render(scene ?? threlteScene, camera ?? threlteCamera.current)
    }
  })
}

export const useAsciiEffectContext = () => {
  return getContext<ReturnType<typeof useAsciiEffect>>(KEY)
}
