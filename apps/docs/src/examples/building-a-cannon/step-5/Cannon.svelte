<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'

  let { aim = 0 }: { aim?: number } = $props()

  const WHEEL_RADIUS = 0.4
  const RIM_TUBE = 0.05
  // The rim is a torus laid over the hub, so the hub has to be smaller by the
  // tube radius or the wheel sits below the ground.
  const HUB_RADIUS = WHEEL_RADIUS - RIM_TUBE
  const WHEEL_X = 0.3
  const WHEEL_Z = 0.5
  const CHEEK_Z = 0.36
  const CHEEK_HEIGHT = 0.55

  // A real barrel pivots about its trunnions, forward of the carriage's middle
  // so the breech has room to swing down.
  const PIVOT_HEIGHT = 0.8
  // The cheeks carry the barrel, so their top has to meet the pivot rather than
  // stopping short of it.
  const CHEEK_CENTRE_Y = PIVOT_HEIGHT - CHEEK_HEIGHT / 2
  const PIVOT_X = 0.35
  const BARREL_LENGTH = 1.6
  const BARREL_BACK = BARREL_LENGTH * 0.34
</script>

<!-- The carriage never moves, so it is a fixed body. One box collider stands in
     for the whole assembly: colliders do not have to match the meshes. -->
<RigidBody type="fixed">
  <T.Group position.y={0.45}>
    <Collider
      shape="cuboid"
      args={[1, 0.45, 0.6]}
    />
  </T.Group>

  <!-- Cheeks: the side plates that carry the barrel. -->
  {#each [CHEEK_Z, -CHEEK_Z] as cheekZ (cheekZ)}
    <T.Mesh
      castShadow
      position={[-0.1, CHEEK_CENTRE_Y, cheekZ]}
    >
      <T.BoxGeometry args={[1.8, CHEEK_HEIGHT, 0.12]} />
      <T.MeshStandardMaterial color="#6B4A32" />
    </T.Mesh>
  {/each}

  <!-- Trail: the tail that rests on the ground behind the wheels. -->
  <T.Mesh
    castShadow
    position={[-1.15, 0.15, 0]}
  >
    <T.BoxGeometry args={[0.8, 0.3, 0.5]} />
    <T.MeshStandardMaterial color="#6B4A32" />
  </T.Mesh>

  <!-- Axle, running through both wheels. -->
  <T.Mesh
    castShadow
    position={[WHEEL_X, WHEEL_RADIUS, 0]}
    rotation.x={Math.PI / 2}
  >
    <T.CylinderGeometry args={[0.07, 0.07, 1.2, 12]} />
    <T.MeshStandardMaterial color="#4A3524" />
  </T.Mesh>

  <!-- Cap plates bolted over the trunnions. They belong to the carriage, so
       they must not move when the barrel elevates. -->
  {#each [CHEEK_Z, -CHEEK_Z] as capZ (capZ)}
    <T.Mesh
      castShadow
      position={[PIVOT_X, PIVOT_HEIGHT, capZ]}
    >
      <T.BoxGeometry args={[0.3, 0.2, 0.18]} />
      <T.MeshStandardMaterial color="#4A3524" />
    </T.Mesh>
  {/each}

  {#each [WHEEL_Z, -WHEEL_Z] as wheelZ (wheelZ)}
    <T.Group
      position={[WHEEL_X, WHEEL_RADIUS, wheelZ]}
      rotation.x={Math.PI / 2}
    >
      <T.Mesh castShadow>
        <T.CylinderGeometry args={[HUB_RADIUS, HUB_RADIUS, 0.11, 20]} />
        <T.MeshStandardMaterial color="#5C4433" />
      </T.Mesh>
      <T.Mesh
        castShadow
        rotation.x={Math.PI / 2}
      >
        <T.TorusGeometry args={[HUB_RADIUS, RIM_TUBE, 8, 24]} />
        <T.MeshStandardMaterial
          color="#33302C"
          metalness={0.6}
          roughness={0.5}
        />
      </T.Mesh>
    </T.Group>
  {/each}
</RigidBody>

<!-- The barrel is decoration: the shot is an impulse, so it needs no collider. -->
<T.Group
  position={[PIVOT_X, PIVOT_HEIGHT, 0]}
  rotation.z={aim}
>
  <T.Mesh
    castShadow
    position.x={BARREL_LENGTH / 2 - BARREL_BACK}
    rotation.z={-Math.PI / 2}
  >
    <T.CylinderGeometry args={[0.155, 0.21, BARREL_LENGTH, 24]} />
    <T.MeshStandardMaterial
      color="#3A3A3C"
      metalness={0.75}
      roughness={0.35}
    />
  </T.Mesh>

  <T.Mesh
    castShadow
    position.x={BARREL_LENGTH - 0.04 - BARREL_BACK}
    rotation.z={-Math.PI / 2}
  >
    <T.CylinderGeometry args={[0.185, 0.165, 0.14, 24]} />
    <T.MeshStandardMaterial
      color="#2E2E30"
      metalness={0.8}
      roughness={0.3}
    />
  </T.Mesh>

  <T.Mesh
    castShadow
    position.x={-BARREL_BACK}
  >
    <T.SphereGeometry args={[0.235, 20, 14]} />
    <T.MeshStandardMaterial
      color="#3A3A3C"
      metalness={0.75}
      roughness={0.35}
    />
  </T.Mesh>

  <!-- The trunnion sits on the pivot itself, so elevating the barrel turns it
       in place rather than swinging it through an arc. -->
  <T.Mesh
    castShadow
    rotation.x={Math.PI / 2}
  >
    <T.CylinderGeometry args={[0.075, 0.075, 0.92, 12]} />
    <T.MeshStandardMaterial
      color="#2E2E30"
      metalness={0.7}
      roughness={0.4}
    />
  </T.Mesh>
</T.Group>
