<script lang="ts">
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useGltf, useTexture, InstancedMesh, Instance } from '@threlte/extras'

  interface Props {
    transformData?: [number, number, number, number][]
  }

  let { transformData = [] }: Props = $props()

  type GLTFResult = {
    nodes: {
      Bush: THREE.Mesh
    }
    materials: {
      Bush_Leaves: THREE.MeshStandardMaterial
    }
  }

  const assets = Promise.all([
    useGltf<GLTFResult>('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Bush.gltf'),
    useTexture('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/Bush_Leaves.png')
  ])
</script>

{#await assets then [$gltf, $texture1]}
  <InstancedMesh castShadow>
    <T is={$gltf.nodes.Bush.geometry} />
    <T.MeshStandardMaterial
      map={$texture1}
      alphaTest={0.2}
    />
    {#each transformData as randomValues}
      {@const x = randomValues[0] - 10}
      {@const z = randomValues[1] - 10}
      {@const rot = randomValues[2] * Math.PI * 2}
      {@const scale = randomValues[3] * 2 + 0.5}
      <T.Group
        position.x={x}
        position.z={z}
        rotation.y={rot}
        {scale}
      >
        <Instance rotation={[1.96, -0.48, -0.85]} />
      </T.Group>
    {/each}
  </InstancedMesh>
{/await}
