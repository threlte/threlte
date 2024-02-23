<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'
  import { OrbitControls, PerfMonitor } from '@threlte/extras'

  let billboarding = false
  let fps = 10
</script>

<div>
  <Canvas>
    <PerfMonitor />

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
