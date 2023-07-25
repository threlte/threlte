<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Sheet, Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
</script>

<Canvas>
  <Theatre>
    <Sheet>
      <Scene />
    </Sheet>
  </Theatre>
</Canvas>
