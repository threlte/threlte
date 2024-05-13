import { createThrelteContext, currentWritable, useThrelte, watch } from '@threlte/core'

export const createChildThrelteContext = () => {
  const context = useThrelte()

  const childContext = createThrelteContext({
    autoRender: context.autoRender.current,
    autoRenderTask: context.autoRenderTask,
    colorManagementEnabled: context.colorManagementEnabled.current,
    colorSpace: context.colorSpace.current,
    dpr: context.dpr.current,
    parentSize: context.size,
    renderMode: context.renderMode.current,
    userSize: currentWritable(undefined),
    shadows: context.shadows.current,
    toneMapping: context.toneMapping.current,
    useLegacyLights: context.useLegacyLights.current,
    scheduler: context.scheduler,
    mainStage: context.mainStage,
    renderStage: context.renderStage
  })

  const { renderer } = context

  childContext.autoRenderTask = childContext.renderStage.createTask(Symbol(), () => {
    const { autoClear } = renderer

    renderer.autoClear = false
    renderer.outputColorSpace = childContext.colorSpace.current
    renderer.toneMapping = childContext.toneMapping.current
    renderer.setPixelRatio(childContext.dpr.current)

    renderer.clearDepth()
    renderer.render(childContext.scene, childContext.camera.current)

    renderer.autoClear = autoClear
    renderer.outputColorSpace = context.colorSpace.current
    renderer.toneMapping = context.toneMapping.current
    renderer.setPixelRatio(context.dpr.current)
  })

  childContext.renderer = context.renderer

  return childContext
}
