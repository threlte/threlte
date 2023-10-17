<script>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import BirchTree_1 from '../birch1.svelte'
  import Bush1 from '../bush1.svelte'
  import Rock1 from '../rock1.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
>
  <OrbitControls maxPolarAngle={1.57} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[20, 20, 1, 1]} />
  <T.MeshStandardMaterial color="green" />
</T.Mesh>

{#each new Array(10) as _}
  {@const x = Math.random() * 20 - 10}
  {@const z = Math.random() * 20 - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 2 + 1}
  <BirchTree_1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}

{#each new Array(40) as _}
  {@const x = Math.random() * 20 - 10}
  {@const z = Math.random() * 20 - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 2 + 0.5}
  <Bush1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}

{#each new Array(6) as _}
  {@const x = Math.random() * 20 - 10}
  {@const z = Math.random() * 20 - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() + 0.5}
  <Rock1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
