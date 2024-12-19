<script lang="ts">
  import { T } from '@threlte/core'
  import {
    Grid,
    interactivity,
    OrbitControls,
    TransformControls,
    VirtualEnvironment
  } from '@threlte/extras'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import { DoubleSide } from 'three'
  import RenderIndicator from './RenderIndicator.svelte'

  let debug = $state(true)

  interactivity()
</script>

<Pane
  position="fixed"
  title="Render Indicator"
>
  <Checkbox
    bind:value={debug}
    label="debug"
  />
  <RenderIndicator />
</Pane>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
>
  <OrbitControls
    autoRotate={!debug}
    autoRotateSpeed={0.15}
    enableDamping
  />
</T.PerspectiveCamera>

<Grid
  cellColor="white"
  sectionColor="white"
/>

<T.Mesh position.y={1}>
  <T.SphereGeometry />
  <T.MeshStandardMaterial
    color="white"
    roughness={0.15}
  />
</T.Mesh>

{#snippet lightformer(
  update: () => void,
  color: string,
  shape: 'circle' | 'plane',
  size: number,
  position: [number, number, number],
  visible: boolean
)}
  <T.Group {position}>
    {#snippet children({ ref })}
      {@const lookAtCenter = () => ref.lookAt(0, 0, 0)}
      {#if visible}
        <TransformControls
          object={ref}
          oncreate={lookAtCenter}
          onobjectChange={() => {
            lookAtCenter()
            update()
          }}
        />
      {/if}

      <T.Mesh>
        {#if shape === 'circle'}
          <T.CircleGeometry args={[size / 2]} />
        {:else}
          <T.PlaneGeometry args={[size, size]} />
        {/if}
        <T.MeshBasicMaterial
          {color}
          side={DoubleSide}
        />
      </T.Mesh>
    {/snippet}
  </T.Group>
{/snippet}

<VirtualEnvironment
  frames={0}
  visible={debug}
>
  {#snippet children({ update })}
    <T.Group
      oncreate={() => {
        update()
      }}
    >
      {@render lightformer(update, '#FF4F4F', 'plane', 20, [0, 0, -20], debug)}
      {@render lightformer(update, '#FFD0CB', 'circle', 5, [0, 5, 0], debug)}
      {@render lightformer(update, '#2223FF', 'plane', 8, [-3, 0, 4], debug)}
    </T.Group>
  {/snippet}
</VirtualEnvironment>
