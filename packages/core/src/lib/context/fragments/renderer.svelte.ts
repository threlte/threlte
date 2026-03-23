import { getContext, setContext } from 'svelte'
import {
  AgXToneMapping,
  PCFShadowMap,
  SRGBColorSpace,
  WebGLRenderer,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping
} from 'three'
import type { Task } from '../../frame-scheduling/index.js'
import { useTask } from '../../hooks/useTask.svelte.js'
import { useCamera } from './camera.svelte.js'
import { useDOM } from './dom.svelte.js'
import { useScene } from './scene.js'
import { useScheduler } from './scheduler.svelte.js'
import type { WebGPURenderer } from 'three/webgpu'

export type Renderer = WebGLRenderer | WebGPURenderer

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

export interface RendererContext<T extends Renderer> {
  renderer: T

  colorSpace: {
    readonly current: ColorSpace
  }

  toneMapping: {
    readonly current: ToneMapping
  }

  shadows: {
    readonly current: boolean | ShadowMapType
  }

  dpr: {
    readonly current: number
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
  const { camera } = useCamera()
  const { scene } = useScene()
  const { invalidate, renderStage, autoRender, scheduler, frameInvalidated } = useScheduler()
  const { size, canvas } = useDOM()

  const opts = $derived(options())
  const renderer = opts.createRenderer
    ? opts.createRenderer(canvas)
    : new WebGLRenderer({
        canvas,
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true
      })

  const autoRenderTask = renderStage.createTask(Symbol('threlte-auto-render-task'), () => {
    renderer.render(scene, camera.current)
  })

  const colorSpace = $derived<ColorSpace>(opts.colorSpace ?? SRGBColorSpace)
  const dpr = $derived(opts.dpr ?? window.devicePixelRatio)
  const shadows = $derived(opts.shadows ?? PCFShadowMap)
  const toneMapping = $derived(opts.toneMapping ?? AgXToneMapping)

  const context: RendererContext<T> = {
    renderer: renderer as T,
    colorSpace: {
      get current() {
        return colorSpace
      }
    },
    dpr: {
      get current() {
        return dpr
      }
    },
    shadows: {
      get current() {
        return shadows
      }
    },
    toneMapping: {
      get current() {
        return toneMapping
      }
    },
    autoRenderTask
  }

  setContext<RendererContext<T>>('threlte-renderer-context', context)

  $effect.pre(() => {
    renderer.outputColorSpace = colorSpace
  })

  $effect.pre(() => {
    renderer.setPixelRatio(dpr)
  })

  // Resize the renderer when the size changes
  let running = $state(false)
  useTask(
    () => {
      if (!('xr' in renderer) || renderer.xr?.isPresenting) {
        return
      }

      renderer.setSize(size.current.width, size.current.height)
      invalidate()
      running = false
    },
    {
      before: autoRenderTask,
      autoInvalidate: false,
      running: () => running
    }
  )

  $effect.pre(() => {
    if (size.current.width && size.current.height) {
      running = true
    }
  })

  $effect.pre(() => {
    renderer.shadowMap.enabled = shadows !== false

    if (shadows && shadows !== true) {
      renderer.shadowMap.type = shadows
    } else if (shadows === true) {
      renderer.shadowMap.type = PCFShadowMap
    }
  })

  $effect.pre(() => {
    renderer.toneMapping = toneMapping
  })

  $effect.pre(() => {
    if (autoRender.current) {
      context.autoRenderTask.start()
    } else {
      context.autoRenderTask.stop()
    }
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
