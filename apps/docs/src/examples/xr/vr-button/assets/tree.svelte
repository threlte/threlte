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
      Cylinder001: THREE.Mesh
      Cylinder001_1: THREE.Mesh
    }
    materials: {
      NormalTree_Bark: THREE.MeshStandardMaterial
      NormalTree_Leaves: THREE.MeshStandardMaterial
    }
  }

  const assets = Promise.all([
    useGltf<GLTFResult>('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/NormalTree_1.gltf'),
    useTexture('https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/NormalTree_Bark.png'),
    useTexture(
      'https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/NormalTree_Leaves.png'
    ),
    useTexture(
      'https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Textures/NormalTree_Bark_Normal.png'
    )
  ])
</script>

{#await assets then [$gltf, $texture1, $texture2, $normalMap1]}
  <InstancedMesh castShadow>
    <T is={$gltf.nodes.Cylinder001.geometry} />
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
  <InstancedMesh castShadow>
    <T is={$gltf.nodes.Cylinder001_1.geometry} />
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
