<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import { derived } from 'svelte/store'
  import { Color, type Mesh } from 'three'

  export let discSpeed = 0

  let discRotation = 0
  const { start, stop, started } = useTask(
    (delta) => {
      discRotation += delta * discSpeed
    },
    {
      autoStart: false
    }
  )
  $: {
    if (discSpeed <= 0 && $started) stop()
    else if (discSpeed > 0 && !$started) start()
  }

  const gltf = useGltf<{
    nodes: {
      Logo: Mesh
    }
    materials: {}
  }>('/models/turntable/disc-logo.glb')
  const logoGeometry = derived(gltf, (gltf) => {
    if (!gltf) return undefined
    const mesh = gltf.nodes.Logo as Mesh
    return mesh.geometry
  })
</script>

<T.Group {...$$restProps}>
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
    {#if $logoGeometry}
      <T.Mesh
        geometry={$logoGeometry}
        position.y={0.2 + 0.05 + 0.025 + 0.01}
      >
        <T.MeshBasicMaterial
          color={new Color('#ff3e00')}
          toneMapped={false}
        />
      </T.Mesh>
    {/if}
  </T.Group>
</T.Group>
