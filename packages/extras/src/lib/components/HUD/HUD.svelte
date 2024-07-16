<script lang="ts">
  import {
    T,
    HierarchicalObject,
    createSceneContext,
    createCameraContext,
    useThrelte
  } from '@threlte/core'
  import type { HUDProps } from './HUD.svelte'

  const { scene } = createSceneContext()
  const { camera } = createCameraContext()
  const { renderStage, renderer, toneMapping } = useThrelte()

  let {
    autoRender = true,
    toneMapping: hudToneMapping,
    stage = renderStage,
    ref = $bindable(),
    children
  }: HUDProps = $props()

  const key = Symbol('threlte-hud-render-stage')

  $effect.pre(() => {
    if (!autoRender) {
      return
    }

    stage.createTask(key, () => {
      const { autoClear } = renderer

      renderer.autoClear = false
      renderer.toneMapping = hudToneMapping ?? toneMapping.current

      renderer.clearDepth()
      renderer.render(scene, camera.current)

      renderer.autoClear = autoClear
      renderer.toneMapping = toneMapping.current
    })

    return () => stage.removeTask(key)
  })
</script>

<HierarchicalObject>
  <T
    is={scene}
    bind:ref
  >
    {@render children?.({ ref: scene })}
  </T>
</HierarchicalObject>
