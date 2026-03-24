<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import type { Mesh } from 'three'
  import type { DiscProps } from './types'

  let { discSpeed = 0, ...rest }: DiscProps = $props()

  let discRotation = $state(0)

  useTask(
    (delta) => {
      discRotation += delta * discSpeed
    },
    {
      running: () => discSpeed > 0
    }
  )

  const gltf = useGltf<{
    nodes: {
      Logo: Mesh
    }
    materials: {}
  }>('/models/turntable/disc-logo.glb')

  const logoGeometry = $derived($gltf?.nodes.Logo.geometry)
</script>

<T.Group {...rest}>
  <T.Group rotation.y={-discRotation}>
    <!-- DISH (?) -->
    <T.Mesh
      receiveShadow
      castShadow
      position.y={0.1}
    >
      <T.CylinderGeometry args={[1.85, 2, 0.2, 64]} />
      <T.MeshStandardMaterial color="#111111" />
      <Edges
        color="black"
        thresholdAngle={20}
      />
    </T.Mesh>

    <!-- ACTUAL DISC -->
    <T.Mesh
      receiveShadow
      castShadow
      position.y={0.2 + 0.05}
    >
      <T.CylinderGeometry args={[1.75, 1.75, 0.05, 64]} />
      <T.MeshStandardMaterial color="#111111" />
      <Edges
        thresholdAngle={50}
        scale={1}
        color="black"
      />
    </T.Mesh>

    <!-- ROUND LABEL -->
    <T.Mesh
      receiveShadow
      castShadow
      position.y={0.2 + 0.05 + 0.005}
    >
      <T.CylinderGeometry args={[0.8, 0.8, 0.05, 64]} />
      <T.MeshStandardMaterial color="#eedbcb" />
      <Edges
        thresholdAngle={50}
        scale={1}
        color="black"
      />
    </T.Mesh>

    <!-- LOGO -->
    {#if logoGeometry}
      <T.Mesh
        geometry={logoGeometry}
        position.y={0.2 + 0.05 + 0.025 + 0.01}
      >
        <T.MeshBasicMaterial
          color="#ff3e00"
          toneMapped={false}
        />
      </T.Mesh>
    {/if}
  </T.Group>
</T.Group>
