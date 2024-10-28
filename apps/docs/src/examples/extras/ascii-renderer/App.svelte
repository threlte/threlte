<script lang="ts">
  import Scene from './Scene.svelte'
  import type { AsciiEffectOptions } from 'three/examples/jsm/Addon.js'
  import { AsciiRenderer } from '@threlte/extras'
  import { Canvas } from '@threlte/core'
  import { Button, Checkbox, Color, Folder, Pane, Slider, Text } from 'svelte-tweakpane-ui'

  let fgColor = $state('#ff2400')
  let bgColor = $state('#000000')

  const defaultCharacters = ' .:-+*=%@#'
  let characters = $state(defaultCharacters)

  let options: AsciiEffectOptions = $state({
    alpha: 1,
    block: false,
    color: false,
    invert: true,
    resolution: 0.1,
    scale: 1
  })

  let autoRotate = $state(true)
</script>

<div>
  <Pane
    position="fixed"
    title="AsciiRenderer"
  >
    <Folder title="scene">
      <Checkbox
        bind:value={autoRotate}
        label="auto rotate"
      />
    </Folder>
    <Folder title="options">
      <Slider
        bind:value={options.scale}
        label="scale"
        min={1}
        max={10}
        step={1}
      />
      <Slider
        bind:value={options.resolution}
        label="resolution"
        min={0.1}
        max={0.3}
        step={0.1}
      />
      <Slider
        bind:value={options.alpha}
        label="alpha"
        min={0}
        max={1}
        step={0.1}
      />
      <Checkbox
        bind:value={options.invert}
        label="invert"
      />
      <Checkbox
        bind:value={options.color}
        label="color"
      />
      {#if options.color}
        <Checkbox
          bind:value={options.block}
          label="block"
        />
      {/if}
    </Folder>
    <Folder title="props">
      <Text
        bind:value={characters}
        label="characters"
      />
      <Button
        on:click={() => {
          characters = defaultCharacters
        }}
        title="reset characters"
      />
      {#if !options.color}
        <Color
          bind:value={fgColor}
          label="text color"
        />
        <Color
          bind:value={bgColor}
          label="background color"
        />
      {/if}
    </Folder>
  </Pane>
  <Canvas>
    <AsciiRenderer
      {bgColor}
      {characters}
      {fgColor}
      {options}
    />
    <Scene {autoRotate} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
