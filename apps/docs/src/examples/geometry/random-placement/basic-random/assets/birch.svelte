<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh, Instance } from '@threlte/extras'

  interface Props {
    transformData?: [number, number, number, number][]
  }

  let { transformData = [] }: Props = $props()
</script>

<InstancedMesh castShadow>
  <T.BoxGeometry args={[0.1, 2, 0.1]} />
  <T.MeshStandardMaterial color="white" />
  {#each transformData as randomValues}
    {@const x = randomValues[0] * 20 - 10}
    {@const z = randomValues[1] * 20 - 10}
    {@const rot = randomValues[2] * Math.PI * 2}
    {@const scale = randomValues[3] * 2 + 1}
    <T.Group position.y={scale}>
      <Instance
        position.x={x}
        position.z={z}
        rotation.y={rot}
        {scale}
      />
    </T.Group>
  {/each}
</InstancedMesh>
<InstancedMesh castShadow>
  <T.SphereGeometry />
  <T.MeshStandardMaterial color="#489707" />
  {#each transformData as randomValues}
    {@const x = randomValues[0] * 20 - 10}
    {@const z = randomValues[1] * 20 - 10}
    {@const rot = randomValues[2] * Math.PI * 2}
    {@const scale = randomValues[3] * 2 + 1}
    <T.Group position.y={scale * 2}>
      <Instance
        position.x={x}
        position.z={z}
        rotation.y={rot}
        {scale}
      />
    </T.Group>
  {/each}
</InstancedMesh>
