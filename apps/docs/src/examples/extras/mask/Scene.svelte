<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, Float, TransformControls, Mask, useMask } from '@threlte/extras'
  import { Pane, Checkbox, List } from 'svelte-tweakpane-ui'

  let inverse = $state(true)
  let move = $state(false)
  let id = $state<1 | 2 | 3>(1)

  const torusStencil = $derived(useMask(1, inverse))
  const boxStencil = $derived(useMask(2, inverse))
  const icoStencil = $derived(useMask(3, inverse))
</script>

<Pane
  title="Mask"
  position="fixed"
>
  <Checkbox
    bind:value={inverse}
    label="inverse"
  />
  <List
    bind:value={id}
    label="target"
    options={{ torus: 1, box: 2, ico: 3 }}
  />
  <Checkbox
    bind:value={move}
    label="move"
  />
</Pane>

<T.PerspectiveCamera
  makeDefault
  position={[3, 4, 15]}
  fov={15}
>
  <OrbitControls
    enableDamping
    target={[0, 0.5, 0]}
  />
</T.PerspectiveCamera>

<T.Group position={[0, 1, 2]}>
  {#snippet children({ ref })}
    <Mask {id}>
      <T.CircleGeometry args={[0.65]} />
      <T.MeshBasicMaterial />
    </Mask>
    <T.Mesh>
      <T.RingGeometry args={[0.6, 0.7, 50]} />
      <T.MeshBasicMaterial />
    </T.Mesh>
    {#if move}
      <TransformControls
        object={ref}
        showZ={false}
      />
    {/if}
  {/snippet}
</T.Group>

<T.DirectionalLight
  intensity={3}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.6} />

<Grid
  gridSize={[8, 8]}
  cellColor="#46536b"
  position.y={-0.3}
  sectionThickness={0}
  fadeDistance={50}
/>

<Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh position={[0, 0.3, 0]}>
    <T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
    <T.MeshStandardMaterial
      color="#F85122"
      {...torusStencil}
    />
  </T.Mesh>
</Float>

<Float
  floatIntensity={1}
  floatingRange={[0, 0.5]}
>
  <T.Mesh
    position.y={0.5}
    position={[-1.5, 0, -2]}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial
      color="#0059BA"
      {...boxStencil}
    />
  </T.Mesh>
</Float>

<Float
  floatIntensity={1}
  floatingRange={[0, 0.5]}
>
  <T.Mesh
    position={[1.5, 0.3, -2]}
    scale={0.8}
  >
    <T.IcosahedronGeometry />
    <T.MeshStandardMaterial
      color="#F8EBCE"
      {...icoStencil}
    />
  </T.Mesh>
</Float>
