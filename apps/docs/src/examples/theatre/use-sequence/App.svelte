<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Project, Sheet } from '@threlte/theatre'

  import Scene from './Scene.svelte'
  import state from './state.json'
</script>

<div>
  <Canvas>
    <Project config={{ state }}>
      <Sheet>
        <Scene />
      </Sheet>
    </Project>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
