<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'
  import { OrbitControls } from '@threlte/extras'

  let billboarding = $state(false)
  let fps = $state(10)
</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position.z={14}
      position.y={6}
    >
      <OrbitControls />
    </T.PerspectiveCamera>

    <Scene
      {billboarding}
      {fps}
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
