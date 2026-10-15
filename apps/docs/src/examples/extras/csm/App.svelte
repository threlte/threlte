<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { CSM } from '@threlte/extras'
  import { Checkbox, Folder, List, Pane, Point, Slider } from 'svelte-tweakpane-ui'
  import type { CSM as CSMRef } from 'three/examples/jsm/csm/CSM.js'
  import Helper from './Helper.svelte'
  import Scene from './Scene.svelte'

  let enabled = $state(true)
  let cascades = $state(4)
  let mode = $state<'practical' | 'uniform' | 'logarithmic'>('practical')
  let maxFar = $state(2000)
  let lightMargin = $state(200)
  let fade = $state(false)
  let lightDirection = $state<[number, number, number]>([1, -0.75, 1])
  let shadowMapSize = $state(2048)
  let shadowNormalBias = $state(0)
  let shadowRadius = $state(1)
  let shadowIntensity = $state(1)
  let shadowNear = $state(1)
  let shadowFar = $state(4000)

  let showHelper = $state(false)
  let displayFrustum = $state(true)
  let displayPlanes = $state(true)
  let displayShadowBounds = $state(true)

  let csm = $state.raw<CSMRef>()
</script>

<Pane
  title="CSM"
  position="fixed"
>
  <Checkbox
    bind:value={enabled}
    label="enabled"
  />
  <Slider
    bind:value={cascades}
    label="cascades"
    step={1}
    min={1}
    max={4}
  />
  <List
    bind:value={mode}
    label="mode"
    options={{ practical: 'practical', uniform: 'uniform', logarithmic: 'logarithmic' }}
  />
  <Slider
    bind:value={maxFar}
    label="maxFar"
    step={1}
    min={1}
    max={5000}
  />
  <Slider
    bind:value={lightMargin}
    label="lightMargin"
    step={1}
    min={0}
    max={200}
  />
  <Checkbox
    bind:value={fade}
    label="fade"
  />
  <Point
    bind:value={lightDirection}
    label="lightDirection"
    step={0.05}
    min={-1}
    max={1}
  />
  <List
    bind:value={shadowMapSize}
    label="shadowMapSize"
    options={{ 512: 512, 1024: 1024, 2048: 2048 }}
  />
  <Slider
    bind:value={shadowNormalBias}
    label="shadowNormalBias"
    step={0.01}
    min={0}
    max={2}
  />
  <Slider
    bind:value={shadowRadius}
    label="shadowRadius"
    step={0.1}
    min={0}
    max={10}
  />
  <Slider
    bind:value={shadowIntensity}
    label="shadowIntensity"
    step={0.05}
    min={0}
    max={1}
  />
  <Slider
    bind:value={shadowNear}
    label="shadowNear"
    step={1}
    min={1}
    max={1000}
  />
  <Slider
    bind:value={shadowFar}
    label="shadowFar"
    step={100}
    min={100}
    max={20000}
  />
  <Folder title="CSMHelper">
    <Checkbox
      bind:value={showHelper}
      label="show helper"
    />
    <Checkbox
      bind:value={displayFrustum}
      label="frustum"
    />
    <Checkbox
      bind:value={displayPlanes}
      label="planes"
    />
    <Checkbox
      bind:value={displayShadowBounds}
      label="shadow bounds"
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <CSM
      bind:csm
      {enabled}
      {cascades}
      {mode}
      {maxFar}
      {lightMargin}
      {fade}
      {lightDirection}
      {shadowMapSize}
      {shadowNormalBias}
      {shadowRadius}
      {shadowIntensity}
      {shadowNear}
      {shadowFar}
    >
      <Scene />

      {#if showHelper && csm !== undefined}
        <Helper
          {csm}
          {displayFrustum}
          {displayPlanes}
          {displayShadowBounds}
        />
      {/if}

      {#snippet fallback()}
        <T.DirectionalLight castShadow={false} />
      {/snippet}
    </CSM>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
