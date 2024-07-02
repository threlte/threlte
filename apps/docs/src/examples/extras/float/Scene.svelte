<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, Float, Grid, interactivity, useGltf } from '@threlte/extras'
  import type { Mesh } from 'three'
  import Blob from './Blob.svelte'

  type Nodes = 'ball-1' | 'ball-2' | 'ball-3' | 'ball-4' | 'ball-5'

  const gltf = useGltf<{
    nodes: Record<Nodes, Mesh>
    materials: {}
  }>('/models/blobs/blobs.glb', {
    useDraco: true
  })

  interactivity()
</script>

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<Float
  rotationIntensity={0.15}
  rotationSpeed={2}
>
  <T.PerspectiveCamera
    makeDefault
    position.y={10}
    position.z={10}
    fov={90}
    oncreate={({ ref }) => {
      ref.lookAt(0, 0, 0)
    }}
  />
</Float>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.AmbientLight intensity={0.3} />

<Grid
  position.y={-10}
  sectionThickness={1}
  infiniteGrid
  cellColor="#dddddd"
  sectionColor="#ffffff"
  sectionSize={10}
  cellSize={2}
/>

{#if $gltf}
  {#each Object.values($gltf.nodes) as node}
    {#if node.geometry}
      <Blob geometry={node.geometry} />
    {/if}
  {/each}
{/if}
