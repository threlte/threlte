<script lang="ts">
  import { T, HierarchicalObject } from '@threlte/core'
  import type { HUDProps } from './HUD.svelte'
  import { createChildThrelteContext } from '../../lib/createChildContext'

  let { autoRender, colorSpace, toneMapping, dpr, stage, ref = $bindable() }: HUDProps = $props()

  const hudContext = createChildThrelteContext()
  const { scene, invalidate } = hudContext

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
