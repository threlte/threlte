<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { CHANNEL_BOTTOM_Y, CHANNEL_TOP_Y, FIELD_HEIGHT, FIELD_WIDTH } from './gameState.svelte'

  const wallThickness = 0.18
  const channelWidth = 0.5
  const halfW = FIELD_WIDTH / 2
  const halfH = FIELD_HEIGHT / 2
</script>

<!-- Backboard -->
<T.Mesh
  position={[0, 0, -0.18]}
  receiveShadow
>
  <T.BoxGeometry args={[FIELD_WIDTH, FIELD_HEIGHT, 0.05]} />
  <T.MeshStandardMaterial
    color="#211a36"
    roughness={0.85}
    metalness={0.1}
  />
</T.Mesh>

<RigidBody type="fixed">
  <!-- Left wall -->
  <T.Group position={[-halfW, 0, 0]}>
    <Collider
      shape="cuboid"
      args={[wallThickness / 2, halfH, 0.3]}
    />
    <T.Mesh castShadow>
      <T.BoxGeometry args={[wallThickness, FIELD_HEIGHT, 0.4]} />
      <T.MeshStandardMaterial
        color="#3a2a55"
        metalness={0.4}
        roughness={0.35}
      />
    </T.Mesh>
  </T.Group>

  <!-- Right wall -->
  <T.Group position={[halfW, 0, 0]}>
    <Collider
      shape="cuboid"
      args={[wallThickness / 2, halfH, 0.3]}
    />
    <T.Mesh castShadow>
      <T.BoxGeometry args={[wallThickness, FIELD_HEIGHT, 0.4]} />
      <T.MeshStandardMaterial
        color="#3a2a55"
        metalness={0.4}
        roughness={0.35}
      />
    </T.Mesh>
  </T.Group>

  <!-- Top wall -->
  <T.Group position={[0, halfH, 0]}>
    <Collider
      shape="cuboid"
      args={[halfW, wallThickness / 2, 0.3]}
    />
    <T.Mesh castShadow>
      <T.BoxGeometry args={[FIELD_WIDTH, wallThickness, 0.4]} />
      <T.MeshStandardMaterial
        color="#3a2a55"
        metalness={0.4}
        roughness={0.35}
      />
    </T.Mesh>
  </T.Group>

  <!-- Floor -->
  <T.Group position={[0, -halfH, 0]}>
    <Collider
      shape="cuboid"
      args={[halfW, wallThickness / 2, 0.3]}
    />
    <T.Mesh castShadow>
      <T.BoxGeometry args={[FIELD_WIDTH, wallThickness, 0.4]} />
      <T.MeshStandardMaterial
        color="#3a2a55"
        metalness={0.4}
        roughness={0.35}
      />
    </T.Mesh>
  </T.Group>

  <!-- Launch channel inner wall -->
  {@const channelWallLen = (CHANNEL_TOP_Y - CHANNEL_BOTTOM_Y) / 2}
  {@const channelWallCenterY = (CHANNEL_TOP_Y + CHANNEL_BOTTOM_Y) / 2}

  <T.Group position={[halfW - channelWidth - wallThickness / 2, channelWallCenterY, 0]}>
    <Collider
      shape="cuboid"
      args={[wallThickness / 2, channelWallLen, 0.3]}
    />
    <T.Mesh castShadow>
      <T.BoxGeometry args={[wallThickness, channelWallLen * 2, 0.4]} />
      <T.MeshStandardMaterial
        color="#5a3a8a"
        metalness={0.5}
        roughness={0.3}
      />
    </T.Mesh>
  </T.Group>

  <!-- Channel-top angled wall -->
  <T.Group
    position={[halfW - 0.9, CHANNEL_TOP_Y + 1.5, 0]}
    rotation={[0, 0, -Math.PI / 4]}
  >
    <Collider
      shape="cuboid"
      args={[1.2, wallThickness / 2, 0.3]}
    />
    <T.Mesh castShadow>
      <T.BoxGeometry args={[2.4, wallThickness, 0.4]} />
      <T.MeshStandardMaterial
        color="#5a3a8a"
        metalness={0.5}
        roughness={0.3}
      />
    </T.Mesh>
  </T.Group>
</RigidBody>
