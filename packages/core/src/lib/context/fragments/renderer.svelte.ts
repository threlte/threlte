import { getContext, onDestroy, setContext } from 'svelte'
import {
  AgXToneMapping,
  ColorManagement,
  PCFSoftShadowMap,
  WebGLRenderer,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping
} from 'three'
import type { Task } from '../../frame-scheduling'
import { useTask } from '../../hooks/useTask'
import { currentWritable, watch, type CurrentWritable } from '../../utilities'
import { useCamera } from './camera'
import { useDisposal } from './disposal'
import { useDOM } from './dom'
import { useScene } from './scene'
import { useScheduler } from './scheduler.svelte'
import type { WebGPURenderer } from 'three/webgpu'

export type Renderer = WebGLRenderer | WebGPURenderer

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

type RendererContext<T extends Renderer> = {
  renderer: T
  colorManagementEnabled: CurrentWritable<boolean>
  colorSpace: CurrentWritable<ColorSpace>
  toneMapping: CurrentWritable<ToneMapping>
  shadows: CurrentWritable<boolean | ShadowMapType>
  dpr: CurrentWritable<number>
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
  options: CreateRendererContextOptions<T>
): RendererContext<T> => {
  const { dispose } = useDisposal()
  const { camera } = useCamera()
  const { scene } = useScene()
  const { invalidate, renderStage, autoRender, scheduler, resetFrameInvalidation } = useScheduler()
  const { size, canvas } = useDOM()

  const renderer = options.createRenderer
    ? options.createRenderer(canvas)
    : new WebGLRenderer({
        canvas,
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true
      })

  const autoRenderTask = renderStage.createTask(Symbol('threlte-auto-render-task'), () => {
    renderer.render(scene, camera.current)
  })

  const context: RendererContext<T> = {
    renderer: renderer as T,
    colorManagementEnabled: currentWritable(options.colorManagementEnabled ?? true),
    colorSpace: currentWritable(options.colorSpace ?? 'srgb'),
    dpr: currentWritable(options.dpr ?? window.devicePixelRatio),
    shadows: currentWritable(options.shadows ?? PCFSoftShadowMap),
    toneMapping: currentWritable(options.toneMapping ?? AgXToneMapping),
    autoRenderTask
  }

  setContext<RendererContext<T>>('threlte-renderer-context', context)

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

  // Resize the renderer when the size changes
  const { start, stop } = useTask(
    () => {
      if (!('xr' in renderer) || renderer.xr?.isPresenting) return
      renderer.setSize(size.current.width, size.current.height)
      invalidate()
      stop()
    },
    {
      before: autoRenderTask,
      autoStart: false,
      autoInvalidate: false
    }
  )
  watch([size], () => {
    start()
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

  watch([autoRender], ([autoRender]) => {
    if (autoRender) {
      context.autoRenderTask.start()
    } else {
      context.autoRenderTask.stop()
    }
    return () => {
      context.autoRenderTask.stop()
    }
  })

  if ('setAnimationLoop' in context.renderer) {
    const renderer = context.renderer
    renderer.setAnimationLoop((time) => {
      dispose()
      scheduler.run(time)
      resetFrameInvalidation()
    })
  }

  onDestroy(() => {
    if ('dispose' in context.renderer) {
      const dispose = context.renderer.dispose as () => void
      dispose()
    }
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

export const useRenderer = <T extends Renderer>(): RendererContext<T> => {
  const context = getContext<RendererContext<T>>('threlte-renderer-context')

  if (!context) {
    throw new Error('useRenderer can only be used in a child component to <Canvas>.')
  }

  return context
}
