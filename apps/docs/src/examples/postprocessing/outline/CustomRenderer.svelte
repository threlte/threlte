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

  type Props = {
    mesh: Mesh
  }

  let { mesh }: Props = $props()

  const { scene, renderer, camera, size, autoRender, renderStage } = useThrelte()

  const composer = new EffectComposer(renderer)

  const renderPass = new RenderPass(scene)
  composer.addPass(renderPass)

  $effect(() => {
    composer.setSize($size.width, $size.height)
  })

  export const outlineEffectOptions: ConstructorParameters<typeof OutlineEffect>[2] = {
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
    renderPass.mainCamera = $camera
    outlineEffect.mainCamera = $camera
    outlineEffectPass.mainCamera = $camera
  })

  $effect(() => {
    return () => {
      composer.removeAllPasses()
      outlineEffectPass.dispose()
      renderPass.dispose()
      composer.dispose()
    }
  })

  $effect(() => {
    const last = autoRender.current
    autoRender.set(false)
    return () => {
      autoRender.set(last)
    }
  })

  useTask(
    (delta) => {
      composer.render(delta)
    },
    { stage: renderStage, autoInvalidate: false }
  )
</script>
