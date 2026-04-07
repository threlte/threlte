import { getContext, setContext, untrack } from 'svelte'
import {
  AgXToneMapping,
  PCFShadowMap,
  SRGBColorSpace,
  WebGLRenderer,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping,
  OrthographicCamera,
  PerspectiveCamera
} from 'three'
import type { Task } from '../../frame-scheduling/index.js'
import { useCamera } from './camera.svelte.js'
import { useDOM } from './dom.svelte.js'
import { useScene } from './scene.js'
import { useScheduler } from './scheduler.svelte.js'
import type { WebGPURenderer } from 'three/webgpu'
import { devicePixelRatio } from 'svelte/reactivity/window'
import { useMeasure } from '../../utilities/useMeasure.svelte.js'
import { updateCamera } from '../../components/T/utils/useCamera.svelte.js'

export type Renderer = WebGLRenderer | WebGPURenderer

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

export interface RendererContext<T extends Renderer> {
  renderer: T

  colorSpace: {
    current: ColorSpace
    set(value: ColorSpace): void
  }

  toneMapping: {
    current: ToneMapping
    set(value: ToneMapping): void
  }

  shadows: {
    current: boolean | ShadowMapType
    set(value: boolean | ShadowMapType): void
  }

  dpr: {
    current: number
    set(value: number): void
  }

  autoRenderTask: Task
}

export type CreateRendererContextOptions<T extends Renderer> = {
  createRenderer?: CreateRenderer<T>

  /**
   * Enables THREE.Cache
   *
   * @default true
   */
  cache?: boolean

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
  const { camera, manual } = useCamera()
  const { scene } = useScene()
  const { invalidate, renderStage, autoRender, scheduler, frameInvalidated, mainStage } =
    useScheduler()
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

  const resizeStage = scheduler.createStage(Symbol('threlte-resize-stage'), {
    before: mainStage
  })

  resizeStage.createTask(Symbol('threlte-resize-task'), () => {
    if (renderer.xr.isPresenting) return
    if (!shouldUpdateSize()) return

    renderer.setSize(size.current.width, size.current.height)

    if (!manual.current) {
      updateCamera(
        camera.current as PerspectiveCamera | OrthographicCamera,
        size.current.width,
        size.current.height
      )
    }

    invalidate()
  })

  const autoRenderTask = renderStage.createTask(Symbol('threlte-auto-render-task'), () => {
    renderer.render(scene, camera.current)
  })

  const optsColorSpace = $derived(opts.colorSpace)
  const optsDpr = $derived(opts.dpr)
  const optsShadows = $derived(opts.shadows)
  const optsToneMapping = $derived(opts.toneMapping)

  // Seperate derived runes since users can set these values through the canvas or by .set()
  let colorSpace = $derived<ColorSpace>(optsColorSpace ?? SRGBColorSpace)
  let dpr = $derived(optsDpr ?? devicePixelRatio.current ?? window.devicePixelRatio)
  let shadows = $derived(optsShadows ?? PCFShadowMap)
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
      renderer.shadowMap.type = PCFShadowMap
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
