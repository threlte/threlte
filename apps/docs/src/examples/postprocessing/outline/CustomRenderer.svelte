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

  const renderPass = $derived(new RenderPass(scene, $camera))
  const outlineEffectOptions: ConstructorParameters<typeof OutlineEffect>[2] = {
    blendFunction: BlendFunction.ALPHA,
    edgeStrength: 100,
    pulseSpeed: 0.0,
    visibleEdgeColor: 0xffffff,
    hiddenEdgeColor: 0x9900ff,
    xRay: true,
    blur: true
  }

  const outlineEffect = $derived.by(() => {
    const effect = new OutlineEffect(scene, $camera, outlineEffectOptions)
    effect.selection.add(mesh)
    return effect
  })

  const outlineEffectPass = $derived(new EffectPass($camera, outlineEffect))

  $effect(() => {
    composer.addPass(renderPass)
    composer.addPass(outlineEffectPass)
    return () => {
      composer.removeAllPasses()
    }
  })

  $effect(() => {
    composer.setSize($size.width, $size.height)
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
