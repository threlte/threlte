<script lang="ts">
  import { Canvas } from '@threlte/core'
  import type { StandardGamepad } from '@threlte/extras'
  import { Pane, Folder, Slider, ButtonGrid } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let gamepadRef = $state<StandardGamepad>()

  const buttonNames = [
    'clusterBottom',
    'clusterRight',
    'clusterLeft',
    'clusterTop',
    'leftBumper',
    'rightBumper',
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

  const buttonLabels = $derived(
    gamepadRef
      ? buttonNames.map((name) => (gamepadRef?.button(name).pressed ? `▶ ${name}` : name))
      : buttonNames.map((name) => name)
  )
</script>

<Pane
  title=""
  position="fixed"
>
  <ButtonGrid
    buttons={buttonLabels}
    columns={2}
    disabled
  />

  {#if gamepadRef}
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
