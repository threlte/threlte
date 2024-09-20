<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'
  import { OrbitControls, PerfMonitor } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  let billboarding = true
  let fps = 9
</script>

<div>
  <Canvas>
    <PerfMonitor />

    <T.PerspectiveCamera
      makeDefault
      position.z={14}
      position.y={4}
    >
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={DEG2RAD * 65}
        maxPolarAngle={DEG2RAD * 85}
      />
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
