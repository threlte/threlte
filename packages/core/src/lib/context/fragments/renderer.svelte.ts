import { getContext, setContext, untrack } from 'svelte'
import {
  AgXToneMapping,
  ColorManagement,
  SRGBColorSpace,
  PCFSoftShadowMap,
  WebGLRenderer,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping,
  OrthographicCamera,
  PerspectiveCamera
} from 'three'
import type { Task } from '../../frame-scheduling/index.js'
import {
  runeToCurrentReadable,
  runeToCurrentWritable,
  type CurrentReadable,
  type CurrentWritable
} from '../../utilities/currentWritable.js'
import { useCamera } from './camera.svelte.js'
import { useDOM } from './dom.svelte.js'
import { useScene } from './scene.js'
import { useScheduler } from './scheduler.svelte.js'
import type { WebGPURenderer } from 'three/webgpu'
import { fromStore } from 'svelte/store'
import { devicePixelRatio } from 'svelte/reactivity/window'
import { updateCamera } from '../../components/T/utils/useCamera.svelte.js'

export type Renderer = WebGLRenderer | WebGPURenderer

type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T

export interface RendererContext<T extends Renderer> {
  renderer: T
  colorManagementEnabled: CurrentReadable<boolean>
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
   * @deprecated If you wish to set this to false, set THREE.ColorManagement.enabled = false
   *
   * @default true
   */
  colorManagementEnabled?: boolean

  /**
   * @default 'srgb'
   */
  colorSpace?: ColorSpace

  /**
   * renderer.toneMapping
   * @default THREE.AgXToneMapping
   */
  toneMapping?: ToneMapping

  /**
   * @default THREE.PCFSoftShadowMap
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
  const {
    invalidate,
    mainStage,
    renderStage,
    autoRender: autoRenderStore,
    scheduler,
    frameInvalidated
  } = useScheduler()
  const { canvas, size, shouldUpdateSize } = useDOM()

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
  let shadows = $derived(optsShadows ?? PCFSoftShadowMap)
  let toneMapping = $derived(optsToneMapping ?? AgXToneMapping)

  const context: RendererContext<T> = {
    renderer: renderer as T,
    colorManagementEnabled: runeToCurrentReadable(() => opts.colorManagementEnabled ?? true),
    colorSpace: runeToCurrentWritable(
      () => colorSpace,
      (value) => (colorSpace = value)
    ),
    dpr: runeToCurrentWritable(
      () => dpr,
      (value) => (dpr = value)
    ),
    shadows: runeToCurrentWritable(
      () => shadows,
      (value) => (shadows = value)
    ),
    toneMapping: runeToCurrentWritable(
      () => toneMapping,
      (value) => (toneMapping = value)
    ),
    autoRenderTask
  }

  setContext<RendererContext<T>>('threlte-renderer-context', context)

  const autoRender = fromStore(autoRenderStore)

  ColorManagement.enabled = opts.colorManagementEnabled ?? true

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
