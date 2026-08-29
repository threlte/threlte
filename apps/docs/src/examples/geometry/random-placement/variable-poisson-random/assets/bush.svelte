<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh, Instance } from '@threlte/extras'

  interface Props {
    transformData?: [number, number, number, number][]
  }

  let { transformData = [] }: Props = $props()
</script>

<InstancedMesh castShadow>
  <T.SphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
  <T.MeshStandardMaterial color="#047a01" />
  {#each transformData as randomValues}
    {@const x = randomValues[0] - 10}
    {@const z = randomValues[1] - 10}
    {@const rot = randomValues[2] * Math.PI * 2}
    {@const scale = randomValues[3] * 0.5 + 1}
    <Instance
      position.x={x}
      position.z={z}
      rotation.y={rot}
      {scale}
    />
  {/each}
</InstancedMesh>
