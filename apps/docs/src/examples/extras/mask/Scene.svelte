<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, Grid, Float, TransformControls, Mask, useMask } from '@threlte/extras'
  import { Pane, Checkbox, List } from 'svelte-tweakpane-ui'

  let rotation = 0
  let inverse = true
  let move = false
  let target: 1 | 2 | 3 = 1

  let torusStencil: any = useMask(1, true)
  let boxStencil: any = useMask(2, true)
  let icoStencil: any = useMask(3, true)

  const settingsChanged = () => {
    if (inverse) {
      torusStencil = useMask(1, true)
      boxStencil = useMask(2, true)
      icoStencil = useMask(3, true)
    } else {
      torusStencil = target === 1 ? useMask(1, false) : {}
      boxStencil = target === 2 ? useMask(2, false) : {}
      icoStencil = target === 3 ? useMask(3, false) : {}
    }
  }

  $: {
    settingsChanged()
    inverse
    target
  }

  useTask(() => {
    rotation -= 0.001
  })
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
    bind:value={target}
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
    <Mask id={target}>
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
  cellColor={'#46536b'}
  position.y={-0.3}
  sectionColor="#ffffff"
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
    rotation={[rotation, 128, rotation]}
    scale={0.8}
  >
    <T.IcosahedronGeometry />
    <T.MeshStandardMaterial
      color="#F8EBCE"
      {...icoStencil}
    />
  </T.Mesh>
</Float>
