import { getContext, setContext, untrack } from 'svelte'
import {
  AgXToneMapping,
  ColorManagement,
  SRGBColorSpace,
  PCFSoftShadowMap,
  WebGLRenderer,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping
} from 'three'
import type { Task } from '../../frame-scheduling/index.js'
import { runeToCurrentReadable, type CurrentReadable } from '../../utilities/currentWritable.js'
import { useCamera } from './camera.svelte.js'
import { useDisposal } from './disposal.svelte.js'
import { useDOM } from './dom.svelte.js'
import { useScene } from './scene.js'
import { useScheduler } from './scheduler.svelte.js'
import type { WebGPURenderer } from 'three/webgpu'
import { fromStore } from 'svelte/store'
import { devicePixelRatio } from 'svelte/reactivity/window'
import { useMeasure } from '../../utilities/useMeasure.svelte.js'

export type Renderer = WebGLRenderer | WebGPURenderer

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

export interface RendererContext<T extends Renderer> {
  renderer: T
  colorManagementEnabled: CurrentReadable<boolean>
  colorSpace: CurrentReadable<ColorSpace>
  toneMapping: CurrentReadable<ToneMapping>
  shadows: CurrentReadable<boolean | ShadowMapType>
  dpr: CurrentReadable<number>
  autoRenderTask: Task
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
  options: () => CreateRendererContextOptions<T>
): RendererContext<T> => {
  const { dispose } = useDisposal()
  const { camera } = useCamera()
  const { scene } = useScene()
  const {
    invalidate,
    renderStage,
    autoRender: autoRenderStore,
    scheduler,
    frameInvalidated
  } = useScheduler()
  const { canvas, dom } = useDOM()
  const { shouldUpdateSize, size } = useMeasure(dom)

  const opts = $derived(options())
  const renderer = untrack(() =>
    opts.createRenderer
      ? opts.createRenderer(canvas)
      : new WebGLRenderer({
          canvas,
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true
        })
  )

  const autoRenderTask = renderStage.createTask(Symbol('threlte-auto-render-task'), () => {
    renderer.render(scene, camera.current)
  })

  let colorManagementEnabled = $derived(opts.colorManagementEnabled ?? true)
  let colorSpace = $derived<ColorSpace>(opts.colorSpace ?? SRGBColorSpace)
  let dpr = $derived(opts.dpr ?? devicePixelRatio.current ?? window.devicePixelRatio)
  let shadows = $derived(opts.shadows ?? PCFSoftShadowMap)
  let toneMapping = $derived(opts.toneMapping ?? AgXToneMapping)

  const context: RendererContext<T> = {
    renderer: renderer as T,
    colorManagementEnabled: runeToCurrentReadable(() => colorManagementEnabled),
    colorSpace: runeToCurrentReadable(() => colorSpace),
    dpr: runeToCurrentReadable(() => dpr),
    shadows: runeToCurrentReadable(() => shadows),
    toneMapping: runeToCurrentReadable(() => toneMapping),
    autoRenderTask
  }

  setContext<RendererContext<T>>('threlte-renderer-context', context)

  const autoRender = fromStore(autoRenderStore)

  $effect.pre(() => {
    ColorManagement.enabled = colorManagementEnabled
    invalidate()
  })
  $effect.pre(() => {
    renderer.outputColorSpace = colorSpace
    invalidate()
  })
  $effect.pre(() => {
    renderer.setPixelRatio(dpr)
    invalidate()
  })

  $effect.pre(() => {
    renderer.shadowMap.enabled = shadows !== false

    if (shadows && shadows !== true) {
      renderer.shadowMap.type = shadows
    } else if (shadows === true) {
      renderer.shadowMap.type = PCFSoftShadowMap
    }
    invalidate()
  })

  $effect.pre(() => {
    renderer.toneMapping = toneMapping
    invalidate()
  })

  $effect.pre(() => {
    if (autoRender.current) {
      context.autoRenderTask.start()
    } else {
      context.autoRenderTask.stop()
    }
    invalidate()

    return () => {
      context.autoRenderTask.stop()
    }
  })

  renderer.setAnimationLoop((time) => {
    if (!renderer.xr.isPresenting && shouldUpdateSize()) {
      renderer.setSize(size.current.width, size.current.height)
      invalidate()
    }

    dispose()
    scheduler.run(time)
    frameInvalidated.current = false
  })

  $effect(() => {
    return () => {
      renderer.setAnimationLoop(null)
      renderer.dispose()
    }
  })

  return context
}

export const useRenderer = <T extends Renderer>(): RendererContext<T> => {
  const context = getContext<RendererContext<T>>('threlte-renderer-context')

  if (!context) {
    throw new Error('useRenderer can only be used in a child component to <Canvas>.')
  }

  return context
}
