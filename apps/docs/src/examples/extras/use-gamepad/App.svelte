<script lang="ts">
  import { Canvas } from '@threlte/core'
  import type { StandardGamepad } from '@threlte/extras'
  import { Pane, Folder, Slider, Checkbox } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let gamepadRef = $state<StandardGamepad>()

  // Buttons
  const buttonNames = [
    'clusterBottom',
    'clusterRight',
    'clusterLeft',
    'clusterTop',
    'leftBumper',
    'rightBumper',
    'leftTrigger',
    'rightTrigger',
    'select',
    'start',
    'leftStickButton',
    'rightStickButton',
    'directionalTop',
    'directionalBottom',
    'directionalLeft',
    'directionalRight',
    'center'
  ] as const

  const stickNames = ['leftStick', 'rightStick'] as const
</script>

<Pane
  title=""
  position="fixed"
>
  {#if gamepadRef}
    {#each buttonNames as name}
      <Checkbox
        value={gamepadRef.button(name).pressed}
        label={name}
        disabled
      />
    {/each}

    <Folder title="Triggers">
      <Slider
        value={gamepadRef.button('leftTrigger').value}
        label="LT"
        min={0}
        max={1}
        disabled
      />
      <Slider
        value={gamepadRef.button('rightTrigger').value}
        label="RT"
        min={0}
        max={1}
        disabled
      />
    </Folder>

    <Folder title="Sticks">
      {#each stickNames as name}
        <Slider
          value={gamepadRef.stick(name).x}
          label="{name}X"
          min={-1}
          max={1}
          disabled
        />
        <Slider
          value={gamepadRef.stick(name).y}
          label="{name}Y"
          min={-1}
          max={1}
          disabled
        />
      {/each}
    </Folder>
  {:else}
    <Checkbox
      value={false}
      label="connected"
      disabled
    />
  {/if}
</Pane>

<div>
  <Canvas>
    <Scene bind:gamepadRef />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
