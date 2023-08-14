<script lang="ts">
  import { T, useRender } from '@threlte/core'
  import { Center, RoundedBoxGeometry } from '@threlte/extras'
  import { tick } from 'svelte'
  import type { Box3, Vector3 } from 'three'

  export let x: number = 0
  export let y: number = 0
  export let z: number = 0
  export let precise: boolean = false
  export let showSphere: boolean = false
  export let autoCenter: boolean = false

  let boundingBox: Box3 | undefined
  let center: Vector3 | undefined

  useRender(async ({ renderer, scene, camera }) => {
    await tick()
    renderer.render(scene, camera.current)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={10}
/>

<!-- The property autoCenter is not reactive, therefore we need to key it here. -->
{#key autoCenter}
  <Center
    {x}
    {y}
    {z}
    {precise}
    {autoCenter}
    on:center={({ boundingBox: newBoundingBox, center: newCenter }) => {
      center = newCenter
      boundingBox = newBoundingBox
    }}
  >
    <T.Mesh position.x={-1}>
      <RoundedBoxGeometry args={[1, 2, 1]} />
      <T.MeshStandardMaterial color="#540005" />
    </T.Mesh>

    <T.Mesh
      position.x={-4}
      position.y={1}
    >
      <RoundedBoxGeometry args={[1, 2, 3]} />
      <T.MeshStandardMaterial color="#010039" />
    </T.Mesh>

    {#if showSphere}
      <T.Mesh
        position.x={-2}
        position.y={3}
      >
        <T.SphereGeometry />
        <T.MeshStandardMaterial color="orange" />
      </T.Mesh>
    {/if}
  </Center>
{/key}

{#if boundingBox && center}
  <T.Group
    position.x={center.x}
    position.y={center.y}
    position.z={center.z}
  >
    <T.Box3Helper args={[boundingBox, 'white']} />
  </T.Group>
{/if}

<T.DirectionalLight position={[3, 10, 5]} />
