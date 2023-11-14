<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div id="css-renderer-target" class="absolute top-0 left-0" style="pointer-events: none;" />
<Canvas>
  <Scene />
</Canvas>
