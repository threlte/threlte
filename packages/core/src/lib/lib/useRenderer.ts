import {
  ColorManagement,
  PCFSoftShadowMap,
  WebGLRenderer,
  type WebGLRendererParameters
} from 'three'
import { useTask } from '../hooks/useTask'
import type { ThrelteContext } from '../lib/contexts'
import { currentWritable, memoize, watch } from './storeUtils'

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
 */
export const useRenderer = (ctx: ThrelteContext) => {
  const renderer = currentWritable<WebGLRenderer | undefined>(undefined)

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

  const memoized = memoize(ctx.size)

  const { start, stop } = useTask(
    () => {
      if (renderer.current?.xr?.isPresenting) return
      if (!renderer.current) return
      renderer.current.setSize(memoized.current.width, memoized.current.height)
      ctx.invalidate()
      stop()
    },
    {
      before: ctx.autoRenderTask,
      autoStart: false,
      autoInvalidate: false
    }
  )
  watch([renderer, ctx.size], () => {
    start()
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

  return {
    createRenderer
  }
}
