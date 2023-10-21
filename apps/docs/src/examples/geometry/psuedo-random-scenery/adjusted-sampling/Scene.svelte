<script lang="ts">
  // import { writable } from 'svelte/store'
  import { T, watch } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { radius, regen } from './state'
  import { AdjustedPoissonDiscSample as Sampler, type Point } from './poissonDiscSampling'
  // The following components are copies from https://fun-bit.vercel.app/
  // import BirchTree1 from '../birch1.svelte'
  // import Tree1 from '../tree1.svelte'
  import Bush1 from '../bush1.svelte'
  // import Rock1 from '../rock1.svelte'

  const width = 20
  const height = 20

  let sampler = new Sampler($radius, [width, height], undefined, Math.random, { 0: 6, 1: 2 })
  let points: Point[] = sampler.GeneratePoints()

  watch([regen, radius], () => {
    sampler = new Sampler($radius, [width, height], undefined, Math.random, { 0: 6, 1: 2 })
    points = sampler.GeneratePoints()
    console.log(points)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[20, 20, 20]}
>
  <OrbitControls
    maxPolarAngle={1.56}
    autoRotate
    autoRotateSpeed={0.1}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[width, height, 1, 1]} />
  <T.MeshStandardMaterial color="green" />
</T.Mesh>

{#each points as pos}
  {@const x = pos.x - 10}
  {@const z = pos.y - 10}
  {@const rot = Math.random() * Math.PI * 2}
  {@const scale = Math.random() * 2 + 0.5}
  <Bush1
    position.x={x}
    position.z={z}
    rotation.y={rot}
    {scale}
  />
{/each}
