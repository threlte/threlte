<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import { Color, Mesh, MeshStandardMaterial, MathUtils } from 'three'

  let rotation = $state(0)
  useTask((delta) => {
    rotation += delta
  })

  const gltf = useGltf<{
    nodes: {
      'node_damagedHelmet_-6514': Mesh
    }
    materials: {
      Material_MR: MeshStandardMaterial
    }
  }>('/models/helmet/DamagedHelmet.gltf')
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={10}
  fov={20}
/>

<T.Group rotation.y={rotation}>
  {#await gltf then { nodes }}
    <T.Mesh
      rotation.x={90 * MathUtils.DEG2RAD}
      geometry={nodes['node_damagedHelmet_-6514'].geometry}
    >
      <T.MeshBasicMaterial
        color={new Color(0xff3e00)}
        toneMapped={false}
      />
      <Edges
        thresholdAngle={20}
        color="white"
        scale={1.01}
      />
    </T.Mesh>
  {/await}
</T.Group>
