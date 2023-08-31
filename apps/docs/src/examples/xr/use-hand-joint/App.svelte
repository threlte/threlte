<script lang='ts'>
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
</script>

<Canvas>
  <World gravity={[0, 0, 0]}>
    <Debug />
    <Scene />
  </World>
</Canvas>

<VRButton />
