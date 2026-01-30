<script lang="ts">
  import { Suspense } from '@threlte/extras'
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
</script>

<Canvas>
  <Suspense final>
    <Scene />
  </Suspense>
</Canvas>
