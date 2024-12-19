import { getContext, setContext } from 'svelte'
import {
  AgXToneMapping,
  ColorManagement,
  PCFSoftShadowMap,
  WebGLRenderer,
  type ColorSpace,
  type Renderer,
  type ShadowMapType,
  type ToneMapping
} from 'three'
import { currentWritable, watch, type CurrentWritable } from '../../utilities'
import { useCanvas } from './canvas'

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

type RendererContext = {
  renderer: Renderer
  colorManagementEnabled: CurrentWritable<boolean>
  colorSpace: CurrentWritable<ColorSpace>
  toneMapping: CurrentWritable<ToneMapping>
  shadows: CurrentWritable<boolean | ShadowMapType>
  dpr: CurrentWritable<number>
}

export type CreateRendererContextOptions<T extends Renderer> = {
  createRenderer?: CreateRenderer<T>
  /**
   * Colors supplied to three.js — from color pickers, textures, 3D models, and other sources —
   * each have an associated color space. Those not already in the Linear-sRGB working color
   * space must be converted, and textures be given the correct texture.colorSpace assignment.
   *
   * Set to true for certain conversions (for hexadecimal and CSS colors in sRGB) to be made automatically.
   *
   * This property is not reactive and must be enabled before initializing colors.
   *
   * @default true
   */
  colorManagementEnabled?: boolean
  /**
   * @default 'srgb'
   */
  colorSpace?: ColorSpace
  /**
   * @default AgXToneMapping
   */
  toneMapping?: ToneMapping
  /**
   * @default PCFSoftShadowMap
   */
  shadows?: boolean | ShadowMapType
  /**
   * @default window.devicePixelRatio
   */
  dpr?: number
}

export const createRendererContext = <T extends Renderer>(
  options: CreateRendererContextOptions<T>
): RendererContext => {
  const { canvas } = useCanvas()

  const renderer = options.createRenderer
    ? options.createRenderer(canvas)
    : new WebGLRenderer({
        canvas,
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true
      })

  const context: RendererContext = {
    renderer: renderer,
    colorManagementEnabled: currentWritable(options.colorManagementEnabled ?? true),
    colorSpace: currentWritable(options.colorSpace ?? 'srgb'),
    dpr: currentWritable(options.dpr ?? window.devicePixelRatio),
    shadows: currentWritable(options.shadows ?? PCFSoftShadowMap),
    toneMapping: currentWritable(options.toneMapping ?? AgXToneMapping)
  }

  setContext<RendererContext>('threlte-renderer-context', context)

  watch([context.colorManagementEnabled], ([colorManagementEnabled]) => {
    ColorManagement.enabled = colorManagementEnabled
  })

  watch([context.colorSpace], ([colorSpace]) => {
    if ('outputColorSpace' in renderer) {
      renderer.outputColorSpace = colorSpace
    }
  })

  watch([context.dpr], ([dpr]) => {
    if ('setPixelRatio' in renderer) {
      renderer.setPixelRatio(dpr)
    }
  })

  watch([context.shadows], ([shadows]) => {
    if (!('shadowMap' in renderer)) return

    renderer.shadowMap.enabled = !!shadows
    if (shadows && shadows !== true) {
      renderer.shadowMap.type = shadows
    } else if (shadows === true) {
      renderer.shadowMap.type = PCFSoftShadowMap
    }
  })

  watch([context.toneMapping], ([toneMapping]) => {
    if (!('toneMapping' in renderer)) return
    renderer.toneMapping = toneMapping
  })

  $effect(() => {
    context.colorManagementEnabled.set(options.colorManagementEnabled ?? true)
  })
  $effect(() => {
    context.colorSpace.set(options.colorSpace ?? 'srgb')
  })
  $effect(() => {
    context.toneMapping.set(options.toneMapping ?? AgXToneMapping)
  })
  $effect(() => {
    context.shadows.set(options.shadows ?? PCFSoftShadowMap)
  })
  $effect(() => {
    context.dpr.set(options.dpr ?? window.devicePixelRatio)
  })

  return context
}

export const useRenderer = (): RendererContext => {
  const context = getContext<RendererContext>('threlte-renderer-context')

  if (!context) {
    throw new Error('useRenderer can only be used in a child component to <Canvas>.')
  }

  return context
}
