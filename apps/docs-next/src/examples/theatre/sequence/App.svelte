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
</script>

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
      />
    </Sheet>
  </Project>
</Canvas>

<Controller
  bind:position
  bind:playing
  {play}
  {pause}
/>

<style>
  :global(canvas) {
    height: 100%;
  }
</style>
