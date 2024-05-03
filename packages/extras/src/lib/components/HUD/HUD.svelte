<script lang="ts">
  import { useThrelte, T, useTask, createThrelteContext, HierarchicalObject } from '@threlte/core'
  import { writable } from 'svelte/store'
  import type { HUDProps } from './HUD.svelte'

  let { autoRender, colorSpace, toneMapping, dpr, stage, ref = $bindable() }: HUDProps = $props()

  let context = useThrelte()
  const { renderer, invalidate } = context

  const hudContext = createThrelteContext({
    ...context,
    useLegacyLights: context.useLegacyLights.current,
    colorSpace: colorSpace ?? context.colorSpace.current,
    toneMapping: context.toneMapping.current,
    dpr: dpr ?? context.dpr.current,
    parentSize: context.size,
    userSize: writable(),
    renderMode: context.renderMode.current,
    autoRender: false,
    shadows: context.shadows.current,
    colorManagementEnabled: context.colorManagementEnabled.current
  })

  useTask(
    (delta) => {
      let { autoClear } = renderer

      console.log(delta)

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
      stage: stage ?? context.renderStage
    }
  )

  const { scene, camera } = hudContext

  hudContext.renderer = context.renderer

  $effect.pre(() => {
    if (autoRender !== undefined) hudContext.autoRender.set(autoRender)
    invalidate()
  })

  $effect.pre(() => {
    if (colorSpace !== undefined) hudContext.colorSpace.set(colorSpace)
    invalidate()
  })

  $effect.pre(() => {
    if (toneMapping !== undefined) hudContext.toneMapping.set(toneMapping)
    invalidate()
  })

  $effect.pre(() => {
    if (dpr !== undefined) hudContext.dpr.set(dpr)
    invalidate()
  })
</script>

<HierarchicalObject>
  <T
    is={scene}
    bind:ref
  >
    <slot />
  </T>
</HierarchicalObject>
