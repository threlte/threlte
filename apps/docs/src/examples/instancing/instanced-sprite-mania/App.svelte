<script lang="ts">
  import { MathUtils } from 'three'
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'
  import { OrbitControls } from '@threlte/extras'

  let billboarding = $state(true)
  let fps = $state(9)
</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position.z={14}
      position.y={4}
    >
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={MathUtils.DEG2RAD * 65}
        maxPolarAngle={MathUtils.DEG2RAD * 85}
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
