<script lang="ts">
  import { T, useStage, useThrelte } from '@threlte/core'
  import { Align, Edges, Grid, MeshDiscardMaterial, OrbitControls, Resize } from '@threlte/extras'

  let {
    showCylinder,
    auto
  }: {
    showCylinder: boolean
    auto: boolean
  } = $props()

  // Create the stages for resizing and aligning
  const { renderStage, mainStage } = useThrelte()
  // Resizing must happen *before* aligning, so we need to create a new stage to orchestrate this
  const resizeStage = useStage(Symbol('resize'), { after: mainStage, before: renderStage })
  // Aligning must happen *after* resizing, to take the new size into account
  const alignStage = useStage(Symbol('align'), { after: resizeStage, before: renderStage })
</script>

<T.PerspectiveCamera
  makeDefault
  position={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[5, 10, 4]}
  intensity={Math.PI}
/>
<T.AmbientLight intensity={0.2} />

<Grid
  cellColor="#1F3153"
  cellSize={0.5}
  sectionColor="#1F3153"
  sectionThickness={3}
/>

<T.Mesh position.y={0.5}>
  <MeshDiscardMaterial />
  <T.BoxGeometry />
  <Edges color="white" />
</T.Mesh>

<Align
  stage={alignStage}
  y={1}
  auto
>
  <Resize
    stage={resizeStage}
    {auto}
  >
    <T.Mesh>
      <T.MeshStandardMaterial color="hotpink" />
      <T.BoxGeometry />
    </T.Mesh>
    <T.Mesh position.y={1.5}>
      <T.MeshStandardMaterial color="cyan" />
      <T.SphereGeometry />
    </T.Mesh>
    {#if showCylinder}
      <T.Mesh position.y={3}>
        <T.MeshStandardMaterial color="yellow" />
        <T.CylinderGeometry args={[1, 1.5, 1]} />
      </T.Mesh>
    {/if}
  </Resize>
</Align>
