<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Suspense } from '@threlte/extras'
</script>

<div>
  <Canvas>
    <Suspense>
      <Scene />
    </Suspense>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
