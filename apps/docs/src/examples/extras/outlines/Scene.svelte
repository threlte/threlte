<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, Outlines, useDraco, useGltf } from '@threlte/extras'
  import { Mesh, MeshStandardMaterial, MathUtils } from 'three'

  let rotation = $state(0)
  useTask((delta) => {
    rotation += delta
  })

  const helmetGltf = useGltf<{
    nodes: {
      'node_damagedHelmet_-6514': Mesh
    }
    materials: {
      Material_MR: MeshStandardMaterial
    }
  }>('/models/helmet/DamagedHelmet.gltf')

  const helmetGeometry = $derived($helmetGltf?.nodes['node_damagedHelmet_-6514'].geometry)

  const dracoLoader = useDraco()
  const suziGltf = useGltf<{
    nodes: {
      Suzanne: Mesh
    }
    materials: {
      Material_MR: MeshStandardMaterial
    }
  }>('/models/Suzanne.glb', { dracoLoader })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={20}
  fov={20}
/>

<T.DirectionalLight position={[5, 5, 5]} />

<T.Group
  rotation.y={rotation}
  position.x={-3}
>
  <T.Mesh>
    <T.TorusKnotGeometry args={[0.5, 0.15, 128, 64]} />
    <T.MeshToonMaterial color="#ff3e00" />
    <Outlines color="white" />
    <Outlines
      color="hotpink"
      thickness={0.05}
    />
    <Outlines
      color="yellow"
      thickness={0.1}
    />
  </T.Mesh>
</T.Group>

<T.Group rotation.y={rotation}>
  {#if helmetGeometry}
    <T.Mesh
      rotation.x={90 * MathUtils.DEG2RAD}
      geometry={helmetGeometry}
    >
      <T.MeshBasicMaterial
        color="#ff3e00"
        toneMapped={false}
      />
      <Edges
        thresholdAngle={20}
        color="white"
        scale={1.01}
      />
      <Outlines
        color="white"
        thickness={0.04}
      />
    </T.Mesh>
  {/if}
</T.Group>

{#if $suziGltf}
  <T.Group
    rotation.y={rotation}
    position.x={3}
  >
    <T.Mesh geometry={$suziGltf.nodes['Suzanne'].geometry}>
      <T.MeshToonMaterial color="turquoise" />
      <Outlines
        color="white"
        screenspace
        thickness={3}
      />
    </T.Mesh>
  </T.Group>
{/if}
