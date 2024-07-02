<script lang="ts">
  import { T } from '@threlte/core'
  import { transitions } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Cube from './Cube.svelte'

  export let showCube = true

  transitions()
</script>

<T.PerspectiveCamera
  position={[8, 5, 8]}
  makeDefault
/>

<T.DirectionalLight position={[3, 15, 10]} />
<T.AmbientLight />

{#if showCube}
  <Cube />
{/if}

<T.Mesh
  rotation.x={-90 * DEG2RAD}
  position.y={-0.5}
>
  <T.PlaneGeometry args={[4, 4]} />
  <T.MeshStandardMaterial color="#281543" />
</T.Mesh>
