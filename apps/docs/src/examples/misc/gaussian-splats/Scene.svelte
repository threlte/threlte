<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls, TransformControls, interactivity } from '@threlte/extras'
  import { Checkbox, Folder, FpsGraph, List, Pane, Slider } from 'svelte-tweakpane-ui'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import LumaSplats from './LumaSplatsThree/LumaSplatsThree.svelte'
  import RenderIndicator from './RenderIndicator.svelte'
  import Splat from './Splat/Splat.svelte'

  interactivity()

  // <LumaSplatsThree>
  let showLumaSplats = true
  let lumaSplatsMode: 'object' | 'object-env' | 'env' = 'object-env'

  // <Splat>
  let showSplat = true
  let transformSplat = false
  let alphaHash = true
  let alphaTest = 0
  let toneMapped = true
</script>

<Pane
  position="fixed"
  title="Gaussian Splatting"
  expanded={false}
>
  <Folder
    userExpandable={false}
    expanded
    title="Luma"
  >
    <Checkbox
      bind:value={showLumaSplats}
      label="Show LumaSplats"
    />
    {#if showLumaSplats}
      <List
        bind:value={lumaSplatsMode}
        options={{
          object: 'object',
          'object-env': 'object-env',
          env: 'env'
        }}
      />
    {/if}
  </Folder>

  <Folder
    userExpandable={false}
    expanded
    title="Splat"
  >
    <Checkbox
      bind:value={showSplat}
      label="Show Splats"
    />
    {#if showSplat}
      <Checkbox
        bind:value={transformSplat}
        label="Transform Splat"
      />

      <Checkbox
        bind:value={alphaHash}
        label="alphaHash"
      />

      <Slider
        bind:value={alphaTest}
        label="alphaTest"
        min={0}
        max={1}
        step={0.01}
      />

      <Checkbox
        bind:value={toneMapped}
        label="toneMapped"
      />
    {/if}
  </Folder>

  <Folder title="Rendering Activity">
    <RenderIndicator />
    <FpsGraph />
  </Folder>
</Pane>

{#if showLumaSplats}
  <LumaSplats
    source="https://lumalabs.ai/capture/4c15c22e-8655-4423-aeac-b08f017dda22"
    mode={lumaSplatsMode}
  />
{/if}

{#if showSplat}
  <Splat
    position={[1.08, 2.21, -1.99]}
    rotation={[-32.3 * DEG2RAD, -18.5 * DEG2RAD, -6.4 * DEG2RAD]}
    src="https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat"
    {alphaHash}
    alphaTest={alphaTest > 0 ? alphaTest : undefined}
    {toneMapped}
    let:ref
  >
    {#if transformSplat}
      <TransformControls object={ref} />
    {/if}
  </Splat>
{/if}

<Gizmo
  paddingX={15}
  paddingY={15}
  verticalPlacement="bottom"
  horizontalPlacement="left"
/>

<T.PerspectiveCamera
  makeDefault
  position={[0.22, 2.44, 9.06]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
  fov={25}
>
  <OrbitControls />
</T.PerspectiveCamera>
