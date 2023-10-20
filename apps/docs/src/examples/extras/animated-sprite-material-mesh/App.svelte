<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<Canvas>
  <Scene />

  <T.DirectionalLight intensity={2} castShadow position={[1, 1, 1]} />
</Canvas>
