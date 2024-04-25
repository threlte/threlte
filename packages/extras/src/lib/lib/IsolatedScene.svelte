<script lang="ts">
  import { useThrelte, T, useTask, createThrelteContext, HierarchicalObject } from '@threlte/core'
  import { writable } from 'svelte/store'
  import type { ColorSpace, Texture, ToneMapping, WebGLRenderTarget } from 'three'

  interface Props {
    colorSpace?: ColorSpace
    toneMapping?: ToneMapping
    dpr?: number
    clearDepth?: boolean
    renderTarget?: WebGLRenderTarget<Texture>
    frames?: number
  }

  let {
    colorSpace,
    toneMapping,
    dpr,
    clearDepth = false,
    renderTarget,
    frames = Number.POSITIVE_INFINITY
  }: Props = $props()

  let context = useThrelte()

  const render = () => {
    let { autoClear } = renderer
    let { enabled: xrEnabled } = renderer.xr
    let lastRenderTarget = renderer.getRenderTarget()

    // Disable clearing and set child settings
    renderer.autoClear = false
    renderer.outputColorSpace = childContext.colorSpace.current
    renderer.toneMapping = childContext.toneMapping.current
    renderer.setPixelRatio(childContext.dpr.current)

    if (clearDepth) {
      renderer.clearDepth()
    }

    if (renderTarget) {
      renderer.setRenderTarget(renderTarget)
      renderer.clear()
    }

    renderer.render(scene, camera.current)

    // Restore defaults
    if (renderTarget) {
      renderer.setRenderTarget(lastRenderTarget)
    }

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

  // const stage = context.scheduler.createStage(Symbol('childSceneStage'), {
  //   after: context.renderStage
  // })

  $effect.pre(() => {
    if (colorSpace) childContext.colorSpace.set(colorSpace)
  })

  $effect.pre(() => {
    if (toneMapping) childContext.toneMapping.set(toneMapping)
  })

  $effect.pre(() => {
    if (dpr) childContext.dpr.set(dpr)
  })

  let count = 0

  // const task = useTask(render, { stage })

  // const countTask = useTask(() => {
  //   render()
  //   count += 1
  //   if (count >= frames) stop()
  // })

  // $effect.pre(() => {
  //   if (frames === Number.POSITIVE_INFINITY) {
  //     task.start()
  //     countTask.stop()
  //   } else if (count < frames) {
  //     countTask.start()
  //     task.stop()
  //   } else {
  //     task.stop()
  //     countTask.stop()
  //   }
  // })
</script>

<HierarchicalObject>
  <T is={scene}>
    <slot />
  </T>
</HierarchicalObject>
