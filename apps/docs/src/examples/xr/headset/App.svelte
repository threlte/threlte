<script lang='ts'>
  import { Canvas } from '@threlte/core'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'

  let isPlaying = false
</script>

<Canvas>
  <Scene {isPlaying} />
</Canvas>

<VRButton on:click={() => isPlaying = true} />
