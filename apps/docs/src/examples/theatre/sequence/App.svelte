<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Project, Sequence, Sheet, type SequenceController } from '@threlte/theatre'
  import Controller from './Controller.svelte'
  import Scene from './Scene.svelte'
  import state from './state.json'

  let sequence: SequenceController

  let position: number = 0
  let playing: boolean = false
  let play: (opts?: {}) => Promise<boolean>
  let pause: (opts?: {}) => Promise<boolean>
  let rate: number = 1
</script>

<div>
  <Canvas>
    <Project config={{ state }}>
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
    bind:playing
    bind:rate
    {play}
    {pause}
  />
</div>

<style>
  div {
    height: 100%;
  }
</style>
