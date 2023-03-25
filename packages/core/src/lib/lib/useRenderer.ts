import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ColorManagement,
  LinearEncoding,
  PCFSoftShadowMap,
  sRGBEncoding,
  WebGLRenderer,
  type ColorSpace,
  type TextureEncoding,
  type WebGLRendererParameters
} from 'three'
import type { ThrelteContext } from '../types/types'
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
 * - `size`
 * - `toneMapping`
 * - `colorSpace`
 * - `dpr`
 * - `shadows`
 * - `colorManagementEnabled`
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

  watch(
    [
      renderer,
      ctx.size,
      ctx.toneMapping,
      ctx.colorSpace,
      ctx.dpr,
      ctx.shadows,
      ctx.colorManagementEnabled,
      ctx.useLegacyLights
    ],
    ([
      renderer,
      size,
      toneMapping,
      colorSpace,
      dpr,
      shadows,
      colorManagementEnabled,
      useLegacyLights
    ]) => {
      if (!renderer) return
      renderer.setSize(size.width, size.height)
      renderer.setPixelRatio(dpr)

      // check if the renderer has a colorSpace property, if so, use that
      // otherwise, use the old encoding property
      if (rendererHasOutputColorSpaceProperty(renderer)) {
        renderer.outputColorSpace = colorSpace
      } else {
        const encoding = colorSpaceToEncoding[colorSpace]
        if (!encoding) {
          console.warn('No encoding found for colorSpace', colorSpace)
        } else {
          renderer.outputEncoding = encoding
        }
      }

      renderer.toneMapping = toneMapping
      renderer.shadowMap.enabled = !!shadows
      if (shadows && shadows !== true) {
        renderer.shadowMap.type = shadows
      } else if (shadows === true) {
        renderer.shadowMap.type = PCFSoftShadowMap
      }
      const cm = ColorManagement as any
      if (cm.enabled !== undefined) {
        // since three.js r150 the color management prop is
        // called "enabled", but the types are not up to date :/
        cm.enabled = colorManagementEnabled
      } else if (cm.legacyMode !== undefined) {
        cm.legacyMode = !colorManagementEnabled
      }

      const anyRenderer = renderer as any
      // > r150
      if (useLegacyLights && anyRenderer.useLegacyLights !== undefined) {
        anyRenderer.useLegacyLights = useLegacyLights
      } else if (anyRenderer.physicallyCorrectLights !== undefined) {
        // < r150
        anyRenderer.physicallyCorrectLights = !useLegacyLights
      }
    }
  )

  onDestroy(() => {
    ctx.renderer?.dispose()
  })

  return {
    createRenderer
  }
}
