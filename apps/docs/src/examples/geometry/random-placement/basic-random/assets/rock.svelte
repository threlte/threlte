<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh, Instance } from '@threlte/extras'

  interface Props {
    transformData?: [number, number, number, number][]
  }

  let { transformData = [] }: Props = $props()
</script>

<InstancedMesh castShadow>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="grey" />
  {#each transformData as randomValues}
    {@const x = randomValues[0] * 20 - 10}
    {@const z = randomValues[1] * 20 - 10}
    {@const rot = randomValues[2] * Math.PI * 2}
    {@const scale = randomValues[3] * 0.5 + 1}
    <Instance
      position.x={x}
      position.z={z}
      position.y={0.5 * scale}
      rotation.y={rot}
      {scale}
    />
  {/each}
</InstancedMesh>
