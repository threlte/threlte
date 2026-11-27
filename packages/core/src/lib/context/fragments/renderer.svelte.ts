import { getContext, setContext, untrack } from 'svelte'
import {
  AgXToneMapping,
  SRGBColorSpace,
  PCFSoftShadowMap,
  WebGLRenderer,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping
} from 'three'
import type { Task } from '../../frame-scheduling/index.js'
import { useCamera } from './camera.svelte.js'
import { useDOM } from './dom.svelte.js'
import { useScene } from './scene.svelte.js'
import { useScheduler } from './scheduler.svelte.js'
import type { WebGPURenderer } from 'three/webgpu'
import { devicePixelRatio } from 'svelte/reactivity/window'
import { updateCamera } from '../../components/T/utils/useCamera.svelte.js'

export type Renderer = WebGLRenderer | WebGPURenderer

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

export interface RendererContext<T extends Renderer> {
  renderer: T
  colorSpace: {
    readonly current: ColorSpace
    set(value: ColorSpace): void
  }
  toneMapping: {
    readonly current: ToneMapping
    set(value: ToneMapping): void
  }
  shadows: {
    readonly current: boolean | ShadowMapType
    set(value: boolean | ShadowMapType): void
  }
  dpr: {
    readonly current: number
    set(value: number): void
  }
  autoRenderTask: Task
}

const isRenderableSize = (size: { width: number; height: number }) => {
  return (
    Number.isFinite(size.width) && Number.isFinite(size.height) && size.width > 0 && size.height > 0
  )
}

export interface CreateRendererContextOptions<T extends Renderer> {
  createRenderer?: CreateRenderer<T>

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
   * The device pixel ratio used by the renderer.
   *
   * Pass a single number to set the pixel ratio explicitly. Pass a tuple
   * `[min, max]` to clamp `window.devicePixelRatio` between those bounds —
   * useful for capping render resolution on high-DPI displays while still
   * using the native ratio on lower-DPI ones.
   *
   * @default window.devicePixelRatio
   */
  dpr?: number | [min: number, max: number]
}

export const createRendererContext = <T extends Renderer>(
  options: () => CreateRendererContextOptions<T>
): RendererContext<T> => {
  const { camera, manual } = useCamera()
  const { scene } = useScene()
  const { invalidate, mainStage, renderStage, autoRender, scheduler, frameInvalidated } =
    useScheduler()
  const { canvas, size, shouldUpdateSize } = useDOM()

  const opts = $derived(options())
  const initialOptions = untrack(options)
  const renderer = initialOptions.createRenderer
    ? initialOptions.createRenderer(canvas)
    : new WebGLRenderer({
        canvas,
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true
      })

  const resizeStage = scheduler.createStage(Symbol('threlte-resize-stage'), {
    before: mainStage
  })

  resizeStage.createTask(Symbol('threlte-resize-task'), () => {
    if (renderer.xr.isPresenting) return
    if (!shouldUpdateSize()) return
    if (!isRenderableSize(size.current)) return

    renderer.setSize(size.current.width, size.current.height)

    if (!manual.current) {
      updateCamera(camera.current, size.current.width, size.current.height)
    }

    invalidate()
  })

  const autoRenderTask = renderStage.createTask(Symbol('threlte-auto-render-task'), () => {
    if (!renderer.xr.isPresenting && !isRenderableSize(size.current)) return
    renderer.render(scene.current, camera.current)
  })

  const optsColorSpace = $derived(opts.colorSpace)
  const optsDpr = $derived(opts.dpr)
  const optsShadows = $derived(opts.shadows)
  const optsToneMapping = $derived(opts.toneMapping)

  // Seperate derived runes since users can set these values through the canvas or by .set()
  let colorSpace = $derived<ColorSpace>(optsColorSpace ?? SRGBColorSpace)
  let dpr = $derived.by(() => {
    const target = devicePixelRatio.current ?? window.devicePixelRatio
    if (Array.isArray(optsDpr)) {
      return Math.min(Math.max(optsDpr[0], target), optsDpr[1])
    }
    return optsDpr ?? target
  })
  let shadows = $derived(optsShadows ?? PCFSoftShadowMap)
  let toneMapping = $derived(optsToneMapping ?? AgXToneMapping)

  const context: RendererContext<T> = {
    renderer: renderer as T,
    colorSpace: {
      get current() {
        return colorSpace
      },
      set(value) {
        colorSpace = value
      }
    },
    dpr: {
      get current() {
        return dpr
      },
      set(value) {
        dpr = value
      }
    },
    shadows: {
      get current() {
        return shadows
      },
      set(value) {
        shadows = value
      }
    },
    toneMapping: {
      get current() {
        return toneMapping
      },
      set(value) {
        toneMapping = value
      }
    },
    autoRenderTask
  }

  setContext<RendererContext<T>>('threlte-renderer-context', context)

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

    // If shadows isn't a boolean, it's a shadowMap type
    if (shadows !== false && shadows !== true) {
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
    scheduler.run(time)
    frameInvalidated.current = false
  })

  $effect(() => {
    return () => {
      renderer.setAnimationLoop(null)
      try {
        renderer.dispose()
      } catch {
        // WebGPURenderer.dispose() throws if async init() hasn't completed (e.g. during HMR)
      }
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
