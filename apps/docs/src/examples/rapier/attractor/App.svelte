<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { World, Debug } from '@threlte/rapier'
  import BasicScene from './BasicScene.svelte'
  import type { GravityType } from '@threlte/rapier'
  import AdvancedScene from './AdvancedScene.svelte'
  import { Pane, Slider, TabGroup, TabPage, Checkbox, Button } from 'svelte-tweakpane-ui'

  let reset: () => void = () => {}
  let showHelper = false
  const gravityTypes = ['static', 'linear', 'newtonian'] as const
  let gravityType: GravityType = gravityTypes[0]
  let strengthLeft = 1
  let strengthCenter = 1
  let strengthRight = 1
  let tabIndex = 0
</script>

<Pane
  title="Attractor"
  position="fixed"
>
  <Button
    title="Reset the scene"
    on:click={reset}
  />
  <Checkbox
    bind:value={showHelper}
    label="Show helper"
  />
  <TabGroup bind:selectedIndex={tabIndex}>
    <TabPage title="Basic">
      <Slider
        bind:value={strengthLeft}
        label="Strength left"
        min={-5}
        max={5}
      />
      <Slider
        bind:value={strengthCenter}
        label="Strength center"
        min={-5}
        max={5}
      />
      <Slider
        bind:value={strengthRight}
        label="Strength right"
        min={-5}
        max={5}
      />
    </TabPage>
    <TabPage title="Advanced">
      <Button
        label="Set Gravity Type"
        title="static"
        on:click={() => {
          gravityType = gravityTypes[0]
        }}
      />
      <Button
        label=""
        title="linear"
        on:click={() => {
          gravityType = gravityTypes[1]
        }}
      />
      <Button
        label=""
        title="newtonian"
        on:click={() => {
          gravityType = gravityTypes[2]
        }}
      />
    </TabPage>
  </TabGroup>
</Pane>

<div>
  <Canvas>
    <World gravity={[0, tabIndex == 1 ? 0 : -3, 0]}>
      {#if showHelper}
        <Debug />
      {/if}
      {#if tabIndex == 1}
        <AdvancedScene
          type={gravityType}
          bind:reset
        />
      {:else}
        <BasicScene
          bind:reset
          {strengthLeft}
          {strengthCenter}
          {strengthRight}
        />
      {/if}
      <HTML
        slot="fallback"
        transform
      >
        <p>
          It seems your browser<br />
          doesn't support WASM.<br />
          I'm sorry.
        </p>
      </HTML>
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }

  p {
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
