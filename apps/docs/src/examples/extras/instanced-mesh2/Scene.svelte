<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Instance2, InstancedMesh2 } from '@threlte/extras'

  let dn = Date.now()
  useTask(() => (dn = Date.now()))
</script>

<InstancedMesh2>
  <T.SphereGeometry
    args={[0.5]}
    attach={false}
  />
  <T.MeshStandardMaterial
    color="white"
    attach={false}
  />

  <Instance2
    id={0}
    x={-2}
    y={Math.sin(dn / 1000 + 40)}
  />
  <Instance2
    id={1}
    x={-1}
    y={Math.sin(dn / 1000 + 10)}
  />
  <Instance2
    id={2}
    x={0}
    y={Math.sin(dn / 1000 + 5)}
  />
  <Instance2
    id={3}
    x={1}
    y={Math.sin(dn / 1000 + 200)}
  />
  <Instance2
    id={4}
    x={2}
    y={Math.sin(dn / 1000 + 550)}
  />
</InstancedMesh2>

<T.DirectionalLight
  position.y={10}
  position.z={5}
/>

<T.AmbientLight intensity={0.1} />
