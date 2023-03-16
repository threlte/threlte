<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
</script>

<Canvas>
  <World>
    <Scene />
  </World>
</Canvas>
