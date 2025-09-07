<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Project, Sequence, Sheet, type SequenceController } from '@threlte/theatre'
  import Controller from './Controller.svelte'
  import Scene from './Scene.svelte'
  import stateJson from './state.json'

  let sequence = $state<SequenceController>()
  let position = $state(0)
  let playing = $state(false)
  let play = $state<(opts?: {}) => Promise<boolean>>()
  let pause = $state<(opts?: {}) => Promise<boolean>>()
  let rate = $state(1)
</script>

<div>
  <Canvas>
    <Project config={{ state: stateJson }}>
      <Sheet>
        <Scene />
        <Sequence
          bind:sequence
          bind:playing
          bind:position
          bind:play
          bind:pause
          iterationCount={3}
          direction="alternate"
          autoplay
          delay={1000}
          {rate}
        />
      </Sheet>
    </Project>
  </Canvas>
  <Controller
    bind:position
    bind:rate
    {playing}
    {play}
    {pause}
  />
</div>

<style>
  div {
    height: 100%;
  }
</style>
