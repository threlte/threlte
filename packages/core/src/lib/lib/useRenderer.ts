import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import {
  PCFSoftShadowMap,
  WebGLRenderer,
  type WebGLRendererParameters,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ColorManagement
} from 'three'
import type { ThrelteContext } from '../types/types'
import { watch } from './storeUtils'

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
      ctx.colorManagementEnabled
    ],
    ([renderer, size, toneMapping, colorSpace, dpr, shadows, colorManagementEnabled]) => {
      if (!renderer) return
      renderer.setSize(size.width, size.height)
      renderer.setPixelRatio(dpr)
      renderer.outputEncoding = colorSpace
      renderer.toneMapping = toneMapping
      renderer.shadowMap.enabled = !!shadows
      if (shadows && shadows !== true) {
        renderer.shadowMap.type = shadows
      } else if (shadows === true) {
        renderer.shadowMap.type = PCFSoftShadowMap
      }
      const cm = ColorManagement as any
      if (cm.enabled) {
        // since three.js r150 the color management prop is
        // called "enabled", but the types are not up to date :/
        cm.enabled = colorManagementEnabled
      } else {
        // in r147 the prop was called "legacyMode" but it was
        // inverted, so we need to invert it again
        if (cm.legacyMode) {
          cm.legacyMode = !colorManagementEnabled
        }
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
