<script lang="ts">
  import { BufferGeometry, Color, DoubleSide, Mesh as ThreeMesh, MeshBasicMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { Group, Mesh, PerspectiveCamera, useFrame } from 'threlte'
  import { Edges, useGltf } from 'threlte/extras'

  let rotation = 0
  useFrame(() => {
    rotation += 0.01
  })

  const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
    '/models/helmet/DamagedHelmet.gltf'
  )

  let helmetGeometry: BufferGeometry | undefined
  $: if ($gltf) {
    const mesh = $gltf.nodes['node_damagedHelmet_-6514'] as ThreeMesh
    helmetGeometry = mesh.geometry
  }
</script>

<PerspectiveCamera position={{ z: 10 }} fov={20} />

<Group rotation={{ y: rotation }}>
  {#if helmetGeometry}
    <Mesh
      rotation={{
        x: 90 * DEG2RAD
      }}
      geometry={helmetGeometry}
      material={new MeshBasicMaterial({
        color: new Color(0xff3e00).convertSRGBToLinear(),
        toneMapped: false
      })}
    >
      <Edges threshold={20} color="white" scale={1.01} />
    </Mesh>
  {/if}
</Group>
