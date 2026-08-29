<script>
  import { Canvas } from '@threlte/core'
  import { Sequence, Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
  import state from './state.json'
</script>

<div>
  <Canvas>
    <Theatre config={{ state }}>
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
    height: 100%;
  }
</style>
