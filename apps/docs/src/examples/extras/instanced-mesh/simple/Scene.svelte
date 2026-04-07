<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Instance, InstancedMesh } from '@threlte/extras'

  let dn = $state(Date.now())
  useTask(() => (dn = Date.now()))
</script>

<InstancedMesh>
  <T.SphereGeometry args={[0.5]} />
  <T.MeshStandardMaterial color="white" />

  <Instance
    position.x={-2}
    position.y={Math.sin(dn / 1000 + 40)}
  />
  <Instance
    position.x={-1}
    position.y={Math.sin(dn / 1000 + 10)}
  />
  <Instance
    position.x={0}
    position.y={Math.sin(dn / 1000 + 5)}
  />
  <Instance
    position.x={1}
    position.y={Math.sin(dn / 1000 + 200)}
  />
  <Instance
    position.x={2}
    position.y={Math.sin(dn / 1000 + 550)}
  />
</InstancedMesh>

<T.DirectionalLight
  position.y={10}
  position.z={5}
/>

<T.AmbientLight intensity={0.1} />
