<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, Grid, OrbitControls, transitions } from '@threlte/extras'
  import { fade, fly, scale } from './transitions'

  transitions()

  let { red, blue }: { red: boolean; blue: boolean } = $props()
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<Grid
  sectionColor="#ffffff"
  cellColor="#ffffff"
/>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
>
  <OrbitControls />
</T.PerspectiveCamera>

{#if red}
  <T.Group transition={fly({ y: 2 })}>
    <T.Mesh
      position.y={1}
      position.x={-1.5}
      transition={scale(0.8)}
    >
      <T.SphereGeometry />
      <T.MeshStandardMaterial
        transition={fade()}
        color="red"
      />
    </T.Mesh>
  </T.Group>
{/if}

{#if blue}
  <T.Mesh
    position.y={1}
    position.x={1.5}
  >
    <T.SphereGeometry />
    <T.MeshStandardMaterial
      transition={fade()}
      color="blue"
    />
  </T.Mesh>
{/if}
