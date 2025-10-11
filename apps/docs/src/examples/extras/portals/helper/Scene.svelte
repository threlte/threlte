<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Grid, OrbitControls, TransformControls } from '@threlte/extras'

  const { scene } = useThrelte()
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
    <T.DirectionalLightHelper
      attach={scene}
      args={[ref]}
    >
      {#snippet children({ ref: helperA })}
        <TransformControls
          object={ref}
          onobjectChange={() => helperA.update()}
        />
      {/snippet}
    </T.DirectionalLightHelper>
  {/snippet}
</T.DirectionalLight>

<!-- Blue rim light -->
<T.DirectionalLight
  intensity={0.5}
  color="#2F7DC6"
  position={[-1, -2, 1]}
>
  {#snippet children({ ref })}
    <T.DirectionalLightHelper
      attach={scene}
      args={[ref]}
    >
      {#snippet children({ ref: helperB })}
        <TransformControls
          object={ref}
          onobjectChange={() => helperB.update()}
        />
      {/snippet}
    </T.DirectionalLightHelper>
  {/snippet}
</T.DirectionalLight>

<T.Mesh position.y={0.5}>
  <T.SphereGeometry />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>
