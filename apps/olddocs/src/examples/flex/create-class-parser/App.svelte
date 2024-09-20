<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { NoToneMapping } from 'three'
  import { OrbitControls } from '@threlte/extras'

  let innerWidth = 0
</script>

<svelte:window bind:innerWidth />

<div class="relative h-screen w-screen">
  <Canvas toneMapping={NoToneMapping}>
    <T.OrthographicCamera
      makeDefault
      position.z={1000}
      zoom={innerWidth / 500}
    >
      <OrbitControls />
    </T.OrthographicCamera>

    <Scene />
  </Canvas>
</div>
