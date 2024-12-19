<script lang="ts">
  import { T } from '@threlte/core'
  import {
    Environment,
    Grid,
    interactivity,
    OrbitControls,
    type IntersectionEvent
  } from '@threlte/extras'
  import { AutoColliders, Debug } from '@threlte/rapier'
  import { DoubleSide, type Vector3Tuple } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Rope from './Rope.svelte'

  let { debug, damping, segments }: { debug: boolean; damping: number; segments: number } = $props()

  interactivity()

  let ropeEnd = $state<Vector3Tuple>([0, 0, 0])

  const onpointermove = (e: IntersectionEvent<PointerEvent>) => {
    e.point.x -= 0.2
    ropeEnd = e.point.toArray()
  }
</script>

<Environment url="/textures/equirectangular/hdr/mpumalanga_veld_puresky_1k.hdr" />

{#if debug}
  <Debug />
{/if}

<T.PerspectiveCamera
  makeDefault
  position={[-10, 5, 10]}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Grid
  sectionColor="#122036"
  cellColor="#122036"
  position.y={-5}
/>

<T.Mesh
  {onpointermove}
  rotation.y={90 * DEG2RAD}
>
  <T.CircleGeometry args={[5]} />
  <T.MeshBasicMaterial
    color="#0A0F19"
    side={DoubleSide}
  />
</T.Mesh>

<T.Mesh position={[-5, 0, 0]}>
  <T.SphereGeometry args={[0.2]} />
  <T.MeshStandardMaterial color="#335086" />
</T.Mesh>

<T.Mesh position={ropeEnd}>
  <T.SphereGeometry args={[0.2]} />
  <T.MeshStandardMaterial color="#335086" />
</T.Mesh>

<AutoColliders shape="cuboid">
  <T.Mesh position={[-2.5, 0, -1]}>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#335086" />
  </T.Mesh>
</AutoColliders>

<AutoColliders shape="cuboid">
  <T.Mesh position={[-2.5, 0, 1]}>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#335086" />
  </T.Mesh>
</AutoColliders>

{#key segments}
  <Rope
    ballRadius={0.2}
    ropeStart={[-5, 0, 0]}
    {ropeEnd}
    length={7}
    {segments}
    {damping}
  />
{/key}
