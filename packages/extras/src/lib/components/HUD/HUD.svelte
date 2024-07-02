<script lang='ts' context='module'>
  const key = Symbol('threlte-hud-render-stage')
</script>

<script lang="ts">
  import { T, HierarchicalObject, createSceneContext, createCameraContext, useThrelte } from '@threlte/core'
  import type { HUDProps } from './HUD.svelte'

  let { toneMapping: hudToneMapping, ref = $bindable(), children }: HUDProps = $props()

  createSceneContext()
  createCameraContext()

  const { renderStage, renderer, toneMapping, scene, camera } = useThrelte()

  const stage = renderStage.getTask(key) ?? renderStage.createTask(key, () => {
    const { autoClear } = renderer

    renderer.autoClear = false
    renderer.toneMapping = hudToneMapping ?? toneMapping.current

    renderer.clearDepth()
    renderer.render(scene, camera.current)

    renderer.autoClear = autoClear
    renderer.toneMapping = toneMapping.current
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
