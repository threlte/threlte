import { writable } from 'svelte/store'
import {
  ColorManagement,
  LinearEncoding,
  PCFSoftShadowMap,
  sRGBEncoding,
  WebGLRenderer,
  type ColorSpace,
  type TextureEncoding,
  type WebGLRendererParameters
} from 'three'
import { revision } from './revision'
import type { ThrelteContext } from '../lib/contexts'
import { watch } from './storeUtils'

/**
 * March 2023: Three.js is making a transition to a new color management system. Part of
 * that is that the renderer will accept a `colorSpace` property rather than a
 * property `encoding`. As a fallback for older three versions, we need to map
 * the new `colorSpace` to the old `encoding`.
 */
const colorSpaceToEncoding: Record<ColorSpace, TextureEncoding> = {
  srgb: sRGBEncoding,
  'srgb-linear': LinearEncoding,
  '': LinearEncoding
}

const rendererHasOutputColorSpaceProperty = (
  renderer: any
): renderer is { outputColorSpace: string } => {
  return renderer.outputColorSpace !== undefined
}

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
    if (revision >= 150) {
      ColorManagement.enabled = colorManagementEnabled
    } else {
      (ColorManagement as any).legacyMode = !colorManagementEnabled
    }
  })

  watch([renderer, ctx.colorSpace], ([renderer, colorSpace]) => {
    if (!renderer) return

    // check if the renderer has a colorSpace property, if so, use that
    // otherwise, use the old encoding property
    if (rendererHasOutputColorSpaceProperty(renderer)) {
      renderer.outputColorSpace = colorSpace
    } else {
      const encoding = colorSpaceToEncoding[colorSpace]
      if (!encoding) {
        console.warn('No encoding found for colorSpace', colorSpace)
      } else {
        (renderer as any).outputEncoding = encoding
      }
    }
  })

  watch([renderer, ctx.dpr], ([renderer, dpr]) => {
    renderer?.setPixelRatio(dpr)
  })

  watch([renderer, ctx.size], ([renderer, size]) => {
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

    if (revision >= 150 && useLegacyLights) {
      renderer.useLegacyLights = useLegacyLights
    } else if (revision < 150) {
      (renderer as any).physicallyCorrectLights = !useLegacyLights
    }
  })

  return {
    createRenderer
  }
}
