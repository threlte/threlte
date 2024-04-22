<script lang="ts">
  import { useThrelte, T, useTask, createThrelteContext, HierarchicalObject } from '@threlte/core'
  import { writable } from 'svelte/store'
  import type { ColorSpace, ToneMapping } from 'three'

  interface Props {
    /**
     * @default 'srgb'
     */
    colorSpace?: ColorSpace
    /**
     * @default ACESFilmicToneMapping
     */
    toneMapping?: ToneMapping
    /**
     * @default window.devicePixelRatio
     */
    dpr?: number
  }

  let { colorSpace, toneMapping }: Props = $props()

  let context = useThrelte()
  const hudContext = createThrelteContext({
    ...context,
    useLegacyLights: false,
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
    autoRenderTask: context.autoRenderTask
  })

  const { renderer } = context
  const { scene, camera } = hudContext

  hudContext.renderer = context.renderer

  const stage = context.scheduler.createStage(Symbol('hi'), {
    after: context.renderStage
  })

  $effect.pre(() => {
    if (colorSpace) hudContext.colorSpace.set(colorSpace)
  })

  $effect.pre(() => {
    if (toneMapping) hudContext.toneMapping.set(toneMapping)
  })

  useTask(
    () => {
      let { autoClear: oldClear } = renderer

      // Disable clearing and set hud settings
      renderer.autoClear = false
      renderer.outputColorSpace = hudContext.colorSpace.current
      renderer.toneMapping = hudContext.toneMapping.current
      renderer.setPixelRatio(hudContext.dpr.current)

      renderer.clearDepth()
      renderer.render(scene, camera.current)

      // Restore defaults
      renderer.autoClear = oldClear
      renderer.outputColorSpace = context.colorSpace.current
      renderer.toneMapping = context.toneMapping.current
      renderer.setPixelRatio(context.dpr.current)
    },
    { stage }
  )
</script>

<HierarchicalObject>
  <T is={scene}>
    <slot />
  </T>
</HierarchicalObject>
