<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, Grid, OrbitControls, SoftShadows, transitions } from '@threlte/extras'
  import { fade, scale } from './transitions'

  transitions()

  let { red, blue }: { red: boolean; blue: boolean } = $props()
</script>

{#if red}
  <T.Mesh
    castShadow
    transition={scale(0)}
    position.y={1}
    position.x={-1.5}
  >
    <T.SphereGeometry />
    <T.MeshStandardMaterial
      transparent
      color="red"
    />
  </T.Mesh>
{/if}

{#if blue}
  <T.Mesh
    castShadow
    position.y={1}
    position.x={1.5}
  >
    <T.SphereGeometry />
    <T.MeshToonMaterial
      transparent
      transition={fade()}
      color="blue"
    />
  </T.Mesh>
{/if}

<!-- Environment -->
<SoftShadows />
<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<!-- Camera -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 3, 10]}
  fov={30}
>
  <OrbitControls
    enableDamping
    target={[0, 0.8, 0]}
    enableZoom={false}
    enablePan={false}
  />
</T.PerspectiveCamera>

<!-- Lights -->
<T.DirectionalLight
  position={[10, 10, 10]}
  castShadow
  intensity={Math.PI / 2}
/>
<T.AmbientLight intensity={0.1} />

<!-- Floor -->
<Grid
  sectionColor="#374668"
  cellColor="#374668"
/>
<T.Mesh
  receiveShadow
  position.y={-0.01}
  scale={20}
  rotation.x={-Math.PI / 2}
>
  <T.PlaneGeometry />
  <T.MeshStandardMaterial color="#0F141F" />
</T.Mesh>
