<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import { GLTF, OrbitControls } from '@threlte/extras'
  import { Checkbox, Folder, FpsGraph, List, Pane, Slider } from 'svelte-tweakpane-ui'
  import type { MeshStandardMaterial } from 'three'
  import LumaSplats from './LumaSplatsThree/LumaSplatsThree.svelte'
  import RenderIndicator from './RenderIndicator.svelte'
  import Splat from './Splat/Splat.svelte'

  // <LumaSplatsThree>
  let showLumaSplats = $state(true)
  let lumaSplatsMode: 'object' | 'object-env' | 'env' = $state('object-env')

  // <Splat>
  let showSplat = $state(true)
  let alphaHash = $state(false)
  let alphaTest = $state(0.06)
  let toneMapped = $state(true)

  // Car
  let showPorsche = $state(true)

  let paneExpanded = $state(false)

  let gltfMaterials = $state<Record<string, MeshStandardMaterial>>()
  $effect(() => {
    if (gltfMaterials) {
      Object.values(gltfMaterials).forEach((material) => {
        material.envMapIntensity = 5
      })
    }
  })
</script>

<LumaSplats
  visible={showLumaSplats}
  source="https://lumalabs.ai/capture/4c15c22e-8655-4423-aeac-b08f017dda22"
  mode={lumaSplatsMode}
/>

<Splat
  visible={showSplat}
  position={[1.08, 2.21, -1.99]}
  rotation={[-32.3 * MathUtils.DEG2RAD, -18.5 * MathUtils.DEG2RAD, -6.4 * MathUtils.DEG2RAD]}
  src="https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat"
  {alphaHash}
  alphaTest={alphaTest > 0 ? alphaTest : undefined}
  {toneMapped}
/>

<GLTF
  visible={showPorsche}
  position={[-1.48, -0.51, 2.15]}
  rotation.y={57 * MathUtils.DEG2RAD}
  scale={0.7}
  url="/models/splat-example/porsche_959.glb"
  bind:materials={gltfMaterials}
/>

<T.PerspectiveCamera
  makeDefault
  position={[0.22, 2.44, 9.06]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
  fov={25}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Pane
  position="fixed"
  title="Gaussian Splatting"
  bind:expanded={paneExpanded}
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

  <Folder title="Porsche">
    <Checkbox
      bind:value={showPorsche}
      label="Show Porsche"
    />
  </Folder>

  <Folder title="Rendering Activity">
    <RenderIndicator />
    <FpsGraph />
  </Folder>
</Pane>
