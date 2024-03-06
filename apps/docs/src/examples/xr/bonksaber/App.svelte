<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <World gravity={[0, 0, 0]}>
      <Scene />
    </World>
  </Canvas>
  <VRButton />
</div>

<style>
  div {
    height: 100%;
  }
</style>
