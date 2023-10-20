<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'

  const { addInput, addButton, action } = useTweakpane()

  const fps = addInput({
    label: 'fps',
    value: 10,
    params: {
      min: 1,
      step: 1,
      max: 60
    }
  })

  const loop = addInput({
    label: 'loop',
    value: true
  })

  let play: () => void
  let pause: () => void

  addButton({
    title: 'play',
    onClick: () => play()
  })

  addButton({
    title: 'pause',
    onClick: () => pause()
  })
</script>

<Canvas>
  <Scene />

  <T.Sprite position.y={-2.3}>
    <AnimatedSpriteMaterial
      bind:play
      bind:pause
      textureUrl='/textures/sprites/fire.png'
      totalFrames={8}
      fps={$fps}
      loop={$loop}
    />
    <T.PointLight
      intensity={12}
      decay={0.5}
      position.y={-0.2}
      position.z={0.02}
    />
  </T.Sprite>
  

  <T.AmbientLight />
  <T.DirectionalLight />
</Canvas>

<div use:action />
