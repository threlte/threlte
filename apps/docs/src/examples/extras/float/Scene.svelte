<script lang="ts">
  import Blob from './Blob.svelte'
  import type { Mesh } from 'three'
  import { Environment, Float, Grid, interactivity, useGltf, useDraco } from '@threlte/extras'
  import { T } from '@threlte/core'

  type Nodes = `ball-${'1' | '2' | '3' | '4' | '5'}`

  const dracoLoader = useDraco()
  const gltf = useGltf<{
    nodes: Record<Nodes, Mesh>
    materials: {}
  }>('/models/blobs/blobs.glb', {
    dracoLoader
  })

  interactivity()

  const red = '#fe3d00'
  const blue = '#0000ff'
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<Float
  rotationIntensity={0.15}
  rotationSpeed={2}
>
  <T.PerspectiveCamera
    makeDefault
    position.y={10}
    position.z={10}
    fov={90}
    oncreate={(ref) => {
      ref.lookAt(0, 0, 0)
    }}
  />
</Float>

<Grid
  position.y={-10}
  sectionThickness={1}
  infiniteGrid
  cellColor="#dddddd"
  sectionColor="#ffffff"
  sectionSize={10}
  cellSize={2}
/>

{#await gltf then { nodes }}
  {#each Object.values(nodes) as node}
    <Blob>
      {#snippet children({ hovering })}
        <T.Mesh>
          <T.MeshPhysicalMaterial
            reflectivity={1}
            metalness={0.9}
            roughness={0.2}
            color={hovering ? red : blue}
          />
          {#if node.geometry}
            <T is={node.geometry} />
          {/if}
        </T.Mesh>
      {/snippet}
    </Blob>
  {/each}
{/await}
