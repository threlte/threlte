<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import { BufferGeometry, Color, Mesh, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  let rotation = 0
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

  let helmetGeometry: BufferGeometry | undefined
  $: if ($gltf) {
    const mesh = $gltf.nodes['node_damagedHelmet_-6514'] as Mesh
    helmetGeometry = mesh.geometry
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={10}
  fov={20}
/>

<T.Group rotation.y={rotation}>
  {#if helmetGeometry}
    <T.Mesh
      rotation.x={90 * DEG2RAD}
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
