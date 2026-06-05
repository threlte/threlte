import type { RenderTargetOptions } from 'three'
import { DepthTexture, WebGLRenderTarget } from 'three'
import { isInstanceOf, useThrelte } from '@threlte/core'
import { fromStore } from 'svelte/store'
import { untrack } from 'svelte'

export type UseFBOOptions = RenderTargetOptions & {
  /**
   * if set, the scene depth will be rendered into buffer.depthTexture
   */
  depth?: { width?: number; height?: number } | DepthTexture | boolean
  /**
   * if set, the render target size will be set to the corresponding width and height and not use or follow the size of the canvas
   */
  size?: { width?: number; height?: number }
}

const isGetter = (value: unknown): value is () => UseFBOOptions | undefined =>
  typeof value === 'function'

/**
 * Creates a `WebGLRenderTarget` whose `size` and `depth` configuration is
 * tracked through runes — pass `options` as a getter and the FBO updates when
 * those values change.
 *
 * Other render-target construction options (`format`, `type`, `samples`, …)
 * are read once at hook initialization; later changes to those properties on
 * the options object are ignored.
 *
 * ```svelte
 * <script lang="ts">
 *   import { useFBO } from '@threlte/extras'
 *
 *   let resolution = $state(512)
 *   const target = useFBO(() => ({
 *     size: { width: resolution, height: resolution }
 *   }))
 * </script>
 * ```
 */
export function useFBO(options?: () => UseFBOOptions | undefined): WebGLRenderTarget
/**
 * @deprecated Pass `options` as a getter function instead. This signature will
 * be removed in Threlte 9.
 *
 * ```ts
 * // Before
 * const target = useFBO({ size: { width: 512, height: 512 } })
 *
 * // After
 * const target = useFBO(() => ({ size: { width: 512, height: 512 } }))
 * ```
 */
export function useFBO(options?: UseFBOOptions): WebGLRenderTarget

export function useFBO(
  optionsArg?: UseFBOOptions | (() => UseFBOOptions | undefined)
): WebGLRenderTarget {
  const { dpr: dprStore, size: sizeStore } = useThrelte()
  const dpr = fromStore(dprStore)
  const size = fromStore(sizeStore)

  const getOptions: () => UseFBOOptions = isGetter(optionsArg)
    ? () => optionsArg() ?? {}
    : () => optionsArg ?? {}

  const { depth, size: userSize, ...targetOptions } = $derived(getOptions())
  const width = $derived(
    userSize ? Math.max(userSize.width ?? 1, 1) : dpr.current * size.current.width
  )
  const height = $derived(
    userSize ? Math.max(userSize.height ?? 1, 1) : dpr.current * size.current.height
  )

  const target = new WebGLRenderTarget(
    untrack(() => width),
    untrack(() => height),
    untrack(() => targetOptions)
  )

  $effect(() => {
    target.setSize(width, height)
  })

  $effect(() => {
    if (depth === true) {
      const created = new DepthTexture(target.width, target.height)
      target.depthTexture = created
      return () => created.dispose()
    }

    if (isInstanceOf(depth, 'DepthTexture')) {
      target.depthTexture = depth
      return
    }

    if (depth !== false && depth !== undefined) {
      const width = Math.max(depth.width ?? 1, 1)
      const height = Math.max(depth.height ?? 1, 1)
      const created = new DepthTexture(width, height)
      target.depthTexture = created
      return () => created.dispose()
    }

    target.depthTexture = null as unknown as DepthTexture
    return
  })

  $effect(() => {
    const current = target
    return () => current.dispose()
  })

  return target
}
