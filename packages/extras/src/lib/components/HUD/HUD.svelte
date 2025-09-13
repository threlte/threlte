<script lang="ts">
  import {
    T,
    type ThrelteContext,
    createCameraContext,
    createSceneContext,
    useThrelte
  } from '@threlte/core'
  import type { HUDProps } from './types'
  import { setContext } from 'svelte'
  import { WebGLRenderer } from 'three'

  const { renderStage, renderer, toneMapping } = useThrelte()

  let {
    autoRender = true,
    toneMapping: hudToneMapping,
    stage = renderStage,
    ref = $bindable(),
    children,
    ...rest
  }: HUDProps = $props()

  const parentContext = useThrelte()
  const sceneCtx = createSceneContext()
  const { camera } = createCameraContext()

  setContext<ThrelteContext<WebGLRenderer>>('threlte-context', {
    ...parentContext,
    get scene() {
      return sceneCtx.scene
    },
    set scene(scene) {
      sceneCtx.scene = scene
    },
    camera
  })

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
      renderer.render(sceneCtx.scene, camera.current)

      renderer.autoClear = autoClear
      renderer.toneMapping = toneMapping.current
    })

    return () => stage.removeTask(key)
  })
</script>

<T
  is={sceneCtx.scene}
  bind:ref
  attach={false}
  {...rest}
>
  {@render children?.({ ref: sceneCtx.scene })}
</T>
