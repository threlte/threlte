<script lang="ts">
  import { useThrelte, T, useTask, createThrelteContext, HierarchicalObject } from '@threlte/core'
  import { writable } from 'svelte/store'
  import type { HUDProps } from './HUD'

  let { colorSpace, toneMapping, dpr, stage, ref = $bindable() }: HUDProps = $props()

  let context = useThrelte()
  const hudContext = createThrelteContext({
    ...context,
    useLegacyLights: context.useLegacyLights.current,
    colorSpace: colorSpace ?? context.colorSpace.current,
    toneMapping: context.toneMapping.current,
    dpr: dpr ?? context.dpr.current,
    parentSize: context.size,
    userSize: writable(),
    renderMode: context.renderMode.current,
    autoRender: context.autoRender.current,
    shadows: context.shadows.current,
    colorManagementEnabled: context.colorManagementEnabled.current,
    scheduler: context.scheduler,
    mainStage: context.mainStage,
    renderStage: context.renderStage,
    autoRenderTask: context.autoRenderTask
  })

  const { renderer, invalidate } = context
  const { scene, camera } = hudContext

  hudContext.renderer = context.renderer

  $effect.pre(() => {
    if (colorSpace) hudContext.colorSpace.set(colorSpace)
    invalidate()
  })

  $effect.pre(() => {
    if (toneMapping) hudContext.toneMapping.set(toneMapping)
    invalidate()
  })

  $effect.pre(() => {
    if (dpr) hudContext.dpr.set(dpr)
    invalidate()
  })

  useTask(
    () => {
      if (!context.shouldRender()) {
        return
      }

      let { autoClear } = renderer

      // Disable clearing and set hud settings
      renderer.autoClear = false
      renderer.outputColorSpace = hudContext.colorSpace.current
      renderer.toneMapping = hudContext.toneMapping.current
      renderer.setPixelRatio(hudContext.dpr.current)

      renderer.clearDepth()
      renderer.render(scene, camera.current)

      // Restore defaults
      renderer.autoClear = autoClear
      renderer.outputColorSpace = context.colorSpace.current
      renderer.toneMapping = context.toneMapping.current
      renderer.setPixelRatio(context.dpr.current)
    },
    {
      autoInvalidate: false,
      stage:
        stage ??
        context.scheduler.createStage(Symbol('hud-render-stage'), {
          after: context.renderStage
        })
    }
  )
</script>

<HierarchicalObject>
  <T
    is={scene}
    bind:ref
  >
    <slot />
  </T>
</HierarchicalObject>
