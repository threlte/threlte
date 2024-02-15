<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Sequence, Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
  import state from './state.json'
</script>

<div>
  <Canvas>
    <Theatre
      config={{
        state
      }}
    >
      <Sequence
        autoplay
        iterationCount={Infinity}
      >
        <Scene />
      </Sequence>
    </Theatre>
  </Canvas>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
