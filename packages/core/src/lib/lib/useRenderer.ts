import { writable } from 'svelte/store'
import {
  ColorManagement,
  PCFSoftShadowMap,
  WebGLRenderer,
  type WebGLRendererParameters
} from 'three'
import type { ThrelteContext } from '../lib/contexts'
import { watch } from './storeUtils'

/**
 * ### `useRenderer`
 *
 * This hook creates a renderer and listens to changes in the context to
 * update the renderer accordingly.
 *
 * It listens to the following context properties:
 * - `colorManagementEnabled`
 * - `colorSpace`
 * - `dpr`
 * - `size`
 * - `shadows`
 * - `toneMapping`
 * - `useLegacyLights`
 */
export const useRenderer = (ctx: ThrelteContext) => {
  const renderer = writable<WebGLRenderer | undefined>(undefined)

  const createRenderer = (
    canvas: HTMLCanvasElement,
    rendererParameters: WebGLRendererParameters | undefined
  ): void => {
    ctx.renderer = new WebGLRenderer({
      powerPreference: 'high-performance',
      canvas,
      antialias: true,
      alpha: true,
      ...rendererParameters
    })
    renderer.set(ctx.renderer)
  }

  watch([ctx.colorManagementEnabled], ([colorManagementEnabled]) => {
    ColorManagement.enabled = colorManagementEnabled
  })

  watch([renderer, ctx.colorSpace], ([renderer, colorSpace]) => {
    if (!renderer) return

    renderer.outputColorSpace = colorSpace
  })

  watch([renderer, ctx.dpr], ([renderer, dpr]) => {
    renderer?.setPixelRatio(dpr)
  })

  watch([renderer, ctx.size], ([renderer, size]) => {
    if (renderer?.xr?.isPresenting) return
    renderer?.setSize(size.width, size.height)
  })

  watch([renderer, ctx.shadows], ([renderer, shadows]) => {
    if (!renderer) return

    renderer.shadowMap.enabled = !!shadows
    if (shadows && shadows !== true) {
      renderer.shadowMap.type = shadows
    } else if (shadows === true) {
      renderer.shadowMap.type = PCFSoftShadowMap
    }
  })

  watch([renderer, ctx.toneMapping], ([renderer, toneMapping]) => {
    if (!renderer) return

    renderer.toneMapping = toneMapping
  })

  watch([renderer, ctx.useLegacyLights], ([renderer, useLegacyLights]) => {
    if (!renderer) return

    if (useLegacyLights) {
      renderer.useLegacyLights = useLegacyLights
    }
  })

  return {
    createRenderer
  }
}
