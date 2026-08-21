<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { Button, Checkbox, Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  // The wall's size lives here so the score total is derived from it rather
  // than hardcoded.
  const ROWS = 4
  const COLUMNS = 3

  let debug = $state(false)
  let aim = $state(18)
  let power = $state(14)

  // Bumping fireSignal fires the cannon, resetKey rebuilds the whole scene.
  let fireSignal = $state(0)
  let resetKey = $state(0)

  let score = $state(0)
</script>

<Pane
  position="fixed"
  title="Cannon"
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
  <Slider
    bind:value={aim}
    label="Aim"
    min={0}
    max={85}
    step={1}
  />
  <Slider
    bind:value={power}
    label="Power"
    min={2}
    max={60}
    step={0.5}
  />
  <Button
    title="Fire"
    on:click={() => (fireSignal += 1)}
  />
  <Button
    title="Reset"
    on:click={() => {
      fireSignal = 0
      score = 0
      resetKey += 1
    }}
  />
</Pane>

<div class="score">
  <span class="score-value">{score}</span>
  <span class="score-total">/ {ROWS * COLUMNS}</span>
  <span class="score-label">knocked through</span>
</div>

<div>
  <Canvas>
    <World>
      {#key resetKey}
        <Scene
          {debug}
          {aim}
          rows={ROWS}
          columns={COLUMNS}
          {power}
          {fireSignal}
          onscore={() => (score += 1)}
        />
      {/key}
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }

  .score {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    display: flex;
    height: auto;
    align-items: baseline;
    gap: 0.4rem;
    padding: 0.6rem 1rem;
    border-radius: 0.4rem;
    background: rgb(0 0 0 / 0.55);
    color: white;
    font-family: monospace;
    pointer-events: none;
  }

  .score-value {
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 1;
    color: #6fd6c0;
  }

  .score-total {
    font-size: 1.1rem;
    opacity: 0.7;
  }

  .score-label {
    margin-left: 0.35rem;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.75;
  }
</style>
