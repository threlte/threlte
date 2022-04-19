<script lang="ts">
  import { Canvas } from 'threlte'
</script>

<div class="my-8 rounded-md shadow-lg mx-auto border border-gray-divider">
  <Canvas>
    <slot />
  </Canvas>
</div>

<style>
  div {
    height: 600px;
  }
</style>
