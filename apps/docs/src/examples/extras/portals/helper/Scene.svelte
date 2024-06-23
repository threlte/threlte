<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Grid, OrbitControls, Portal, TransformControls } from '@threlte/extras'
  import type { DirectionalLightHelper } from 'three'

  const { scene } = useThrelte()

  let helperA: DirectionalLightHelper
  let helperB: DirectionalLightHelper
</script>

<T.PerspectiveCamera
  position={[10, 10, 10]}
  makeDefault
  fov={30}
>
  <OrbitControls enableZoom={false} />
</T.PerspectiveCamera>

<Grid />

<!-- Red main light -->
<T.DirectionalLight
  color="#FE3D00"
  intensity={1}
  position={[1.5, 2, 0.5]}
>
  {#snippet children({ ref })}
    <TransformControls
      object={ref}
      onobjectChange={() => {
        if (!helperA) return
        helperA.update()
      }}
    />
    <Portal object={scene}>
      <T.DirectionalLightHelper
        args={[ref]}
        bind:ref={helperA}
      />
    </Portal>
  {/snippet}
</T.DirectionalLight>

<!-- Blue rim light -->
<T.DirectionalLight
  intensity={0.5}
  color="#2F7DC6"
  position={[-1, -2, 1]}
>
  {#snippet children({ ref })}
    <TransformControls
      object={ref}
      onobjectChange={() => {
        if (!helperB) return
        helperB.update()
      }}
    />
    <Portal object={scene}>
      <T.DirectionalLightHelper
        args={[ref]}
        bind:ref={helperB}
      />
    </Portal>
  {/snippet}
</T.DirectionalLight>

<T.Mesh position.y={0.5}>
  <T.SphereGeometry />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>
