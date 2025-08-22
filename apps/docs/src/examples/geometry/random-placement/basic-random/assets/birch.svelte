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
      Cube004: THREE.Mesh
      Cube004_1: THREE.Mesh
    }
    materials: {
      BirchTree_Bark: THREE.MeshStandardMaterial
      BirchTree_Leaves: THREE.MeshStandardMaterial
    }
  }

  const assets = Promise.all([
    useGltf<GLTFResult>('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/BirchTree_1.gltf'),
    useTexture('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/BirchTree_Bark.png'),
    useTexture('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/BirchTree_Leaves.png'),
    useTexture(
      'https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/BirchTree_Bark_Normal.png'
    )
  ])
</script>

{#await assets then [$gltf, $texture1, $texture2, $normalMap1]}
  <InstancedMesh castShadow>
    <T is={$gltf.nodes.Cube004.geometry} />
    <T.MeshStandardMaterial
      map={$texture1}
      map.wrapS={THREE.RepeatWrapping}
      map.wrapT={THREE.RepeatWrapping}
      normalMap={$normalMap1}
      normalMap.wrapS={THREE.RepeatWrapping}
      normalMap.wrapT={THREE.RepeatWrapping}
    />
    {#each transformData as randomValues}
      {@const x = randomValues[0] * 20 - 10}
      {@const z = randomValues[1] * 20 - 10}
      {@const rot = randomValues[2] * Math.PI * 2}
      {@const scale = randomValues[3] * 2 + 1}
      <Instance
        position.x={x}
        position.z={z}
        rotation.y={rot}
        {scale}
      />
    {/each}
  </InstancedMesh>
  <InstancedMesh>
    <T is={$gltf.nodes.Cube004_1.geometry} />
    <T.MeshStandardMaterial
      map={$texture2}
      side={THREE.DoubleSide}
      alphaTest={0.5}
    />
    {#each transformData as randomValues}
      {@const x = randomValues[0] * 20 - 10}
      {@const z = randomValues[1] * 20 - 10}
      {@const rot = randomValues[2] * Math.PI * 2}
      {@const scale = randomValues[3] * 2 + 1}
      <Instance
        position.x={x}
        position.z={z}
        rotation.y={rot}
        {scale}
      />
    {/each}
  </InstancedMesh>
{/await}
