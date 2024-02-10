<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'

  let billboarding = false
  let fps = 10
</script>

<div>
  <Canvas>
    <Scene
      {billboarding}
      {fps}
    />

    <T.DirectionalLight
      intensity={2}
      castShadow
      position={[1, 1, 1]}
    />
  </Canvas>

  <Settings
    bind:billboarding
    bind:fps
  />
</div>

<style>
  div {
    height: 100%;
  }
</style>
