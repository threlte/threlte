<script lang="ts">
  import { T, type Props } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import type { Mesh } from 'three'

  let { ...rest }: Props<Mesh> = $props()
</script>

<T.Mesh {...rest}>
  {@const size = 0.005}
  {@const length = size * 14}
  <T.CylinderGeometry args={[size, size, length]} />
  <T.MeshStandardMaterial color="#eedbcb" />

  <Edges
    color="black"
    scale={1.001}
    thresholdAngle={20}
  />

  <T.Mesh
    position={[size * 4, -length, 0]}
    rotation.z={Math.PI / 5}
  >
    <T.CylinderGeometry args={[size, size, length]} />
    <T.MeshStandardMaterial color="#eedbcb" />

    <Edges
      color="black"
      scale={1.001}
      thresholdAngle={20}
    />

    <T.Mesh
      position={[0, -size * 8, 0]}
      rotation.z={Math.PI / 4}
    >
      <T.IcosahedronGeometry args={[size * 3, 2]} />
      <T.MeshStandardMaterial color="gray" />

      <Edges
        color="black"
        scale={1.001}
        thresholdAngle={20}
      />
    </T.Mesh>
  </T.Mesh>
</T.Mesh>
