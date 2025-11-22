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

  const helmetGeometry = $derived($gltf?.nodes['node_damagedHelmet_-6514'].geometry)
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={10}
  fov={20}
/>

<T.Group rotation.y={rotation}>
  {#if helmetGeometry}
    <T.Mesh
      rotation.x={90 * MathUtils.DEG2RAD}
      geometry={helmetGeometry}
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
  {/if}
</T.Group>
