<script lang="ts">
  import { T, useParent, useThrelte, createThrelteContext, HierarchicalObject } from '@threlte/core'
  import { useFBO } from '../../hooks/useFBO'
  import type { RenderTextureProps, RenderTextureEvents, RenderTextureSlots } from './RenderTexture'
  import { getContext, setContext } from 'svelte'
  import type { ComputeFunction } from '../../interactivity/context'
  import { writable } from 'svelte/store'

  type $$Events = RenderTextureEvents
  type $$Slots = RenderTextureSlots

  let {
    compute,
    width,
    height,
    samples = 8,
    frames = Number.POSITIVE_INFINITY,
    stencilBuffer = false,
    depthBuffer = true,
    generateMipmaps = false,
    children,
    ref = $bindable(),
    colorSpace,
    toneMapping,
    ...props
  }: RenderTextureProps = $props()

  const fbo = useFBO(width, height, {
    samples,
    stencilBuffer,
    depthBuffer,
    generateMipmaps
  })

  let context = useThrelte()

  const render = () => {
    let { autoClear } = renderer
    let { enabled: xrEnabled } = renderer.xr
    let lastRenderTarget = renderer.getRenderTarget()

    // Disable clearing and set child settings
    renderer.autoClear = true
    renderer.outputColorSpace = childContext.colorSpace.current
    renderer.toneMapping = childContext.toneMapping.current
    renderer.setPixelRatio(childContext.dpr.current)
    renderer.setRenderTarget(fbo)
    renderer.render(scene, camera.current)

    // Restore defaults
    renderer.setRenderTarget(lastRenderTarget)
    renderer.autoClear = autoClear
    renderer.xr.enabled = xrEnabled
    renderer.outputColorSpace = context.colorSpace.current
    renderer.toneMapping = context.toneMapping.current
    renderer.setPixelRatio(context.dpr.current)
  }

  const childContext = createThrelteContext({
    ...context,
    useLegacyLights: context.useLegacyLights.current,
    colorSpace: colorSpace ?? context.colorSpace.current,
    toneMapping: context.toneMapping.current,
    dpr: context.dpr.current,
    parentSize: context.size,
    userSize: writable(),
    renderMode: context.renderMode.current,
    autoRender: context.autoRender.current,
    shadows: context.shadows.current,
    colorManagementEnabled: context.colorManagementEnabled.current,
    scheduler: context.scheduler,
    mainStage: context.mainStage,
    renderStage: context.renderStage,
    autoRenderTask: context.renderStage.createTask(Symbol(''), render)
  })

  const { renderer } = context
  const { scene, camera } = childContext

  childContext.renderer = context.renderer

  $effect.pre(() => {
    if (colorSpace) childContext.colorSpace.set(colorSpace)
  })

  $effect.pre(() => {
    if (toneMapping) childContext.toneMapping.set(toneMapping)
  })

  // Since this is only a texture it does not have an easy way to obtain the parent, which we
  // need to transform event coordinates to local coordinates. We use r3f internals to find the
  // next Object3D.
  const parent = useParent()
  console.log($parent.parent)

  const parentComputeFn = getContext('interactivity-compute-fn')

  const uvCompute: ComputeFunction = (event, context) => {
    if (!parent) return false
    // First we call the previous state-onion-layers compute, this is what makes it possible to nest portals
    if (!previous.raycaster.camera)
      previous.events.compute(event, previous, previous.previousRoot?.getState())
    // We run a quick check against the parent, if it isn't hit there's no need to raycast at all
    const [intersection] = previous.raycaster.intersectObject(parent)
    if (!intersection) return false
    // We take that hits uv coords, set up this layers raycaster, et voilà, we have raycasting on arbitrary surfaces
    const uv = intersection.uv
    if (!uv) return false
    state.raycaster.setFromCamera(state.pointer.set(uv.x * 2 - 1, uv.y * 2 - 1), state.camera)

    return true
  }

  setContext('interactivity-compute-fn', uvCompute)
</script>

<T
  is={fbo.texture}
  attach="map"
  bind:ref
  {...props}
/>

<HierarchicalObject>
  <T is={scene}>
    <slot ref={fbo.texture} />
  </T>
</HierarchicalObject>
