<script lang="ts">
  import type { Mesh } from 'three'
  import { useTask, useThrelte } from '@threlte/core'
  import {
    BlendFunction,
    EffectComposer,
    EffectPass,
    OutlineEffect,
    RenderPass
  } from 'postprocessing'
  import { untrack } from 'svelte'

  type Props = {
    mesh: Mesh
  }

  let { mesh }: Props = $props()

  const { scene, renderer, camera, size, autoRender, renderStage, shouldRender } = useThrelte()

  const composer = new EffectComposer(renderer)
  $effect(() => {
    composer.setSize(size.current.width, size.current.height)
  })

  const renderPass = new RenderPass(scene)
  composer.addPass(renderPass)

  const outlineEffectOptions: ConstructorParameters<typeof OutlineEffect>[2] = {
    blendFunction: BlendFunction.ALPHA,
    edgeStrength: 100,
    pulseSpeed: 0.0,
    xRay: true,
    blur: true
  }

  const outlineEffect = new OutlineEffect(scene, undefined, outlineEffectOptions)
  $effect(() => {
    outlineEffect.selection.add(mesh)
    return () => {
      outlineEffect.selection.clear()
    }
  })

  const outlineEffectPass = new EffectPass(undefined, outlineEffect)
  composer.addPass(outlineEffectPass)

  $effect(() => {
    renderPass.mainCamera = camera.current
    outlineEffect.mainCamera = camera.current
    outlineEffectPass.mainCamera = camera.current
  })

  $effect(() => {
    const last = untrack(() => autoRender.current)
    autoRender.set(false)
    return () => {
      autoRender.set(last)
    }
  })

  $effect(() => {
    return () => {
      composer.removeAllPasses()
      outlineEffectPass.dispose()
      renderPass.dispose()
      composer.dispose()
    }
  })

  useTask(
    (delta) => {
      if (shouldRender()) {
        composer.render(delta)
      }
    },
    { stage: renderStage, autoInvalidate: false }
  )
</script>
