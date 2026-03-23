<script lang="ts">
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useGltf, InstancedMesh, Instance } from '@threlte/extras'

  interface Props {
    transformData?: [number, number, number, number][]
  }

  let { transformData = [] }: Props = $props()

  type GLTFResult = {
    nodes: {
      Rock_2: THREE.Mesh
    }
    materials: {
      Rock: THREE.MeshStandardMaterial
    }
  }

  const gltf = useGltf<GLTFResult>(
    'https://fun-bit.vercel.app/Ultimate-Stylized-Nature/Rock_2.gltf'
  )
</script>

{#if $gltf}
  <InstancedMesh
    castShadow
    receiveShadow
  >
    <T is={$gltf.nodes.Rock_2.geometry} />
    <T.MeshStandardMaterial color="grey" />
    {#each transformData as randomValues}
      {@const x = randomValues[0] - 10}
      {@const z = randomValues[1] - 10}
      {@const rot = randomValues[2] * Math.PI * 2}
      {@const scale = randomValues[3] * 4 + 2}
      <Instance
        position.x={x}
        position.z={z}
        rotation.y={rot}
        {scale}
      />
    {/each}
  </InstancedMesh>
{/if}
