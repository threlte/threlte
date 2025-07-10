<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh, Instance } from '@threlte/extras'

  const dn = Date.now()
</script>

<InstancedMesh>
  <T.SphereGeometry args={[0.5]} />
  <T.MeshStandardMaterial color="white" />

  {#each Array(200).keys() as index (index)}
    <Instance
      position.x={-2}
      position.y={Math.sin(dn / 1000 + 40)}
      position.z={index}
    />
    <Instance
      position.x={-1}
      position.y={Math.sin(dn / 1000 + 10)}
      position.z={index}
    />
    <Instance
      position.x={0}
      position.y={Math.sin(dn / 1000 + 5)}
      position.z={index}
    />
    <Instance
      position.x={1}
      position.y={Math.sin(dn / 1000 + 200)}
      position.z={index}
    />
    <Instance
      position.x={2}
      position.y={Math.sin(dn / 1000 + 550)}
      position.z={index}
    />
  {/each}
</InstancedMesh>
