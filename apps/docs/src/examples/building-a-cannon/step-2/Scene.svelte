<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'
  import Cannon from './Cannon.svelte'

  const WALL_X = 7
  const ROWS = 4
  const COLUMNS = 3

  const bricks = Array.from({ length: COLUMNS * ROWS }, (_, i) => {
    const column = i % COLUMNS
    const row = Math.floor(i / COLUMNS)
    // Running bond: alternate rows shift relative to each other. Kept under
    // 0.245 so the end brick of an offset row still has its centre of mass over
    // the brick below it, otherwise it topples on its own.
    const stagger = row % 2 === 0 ? 0.15 : -0.15
    // Columns run across the firing line, so this is a wall facing the cannon
    // rather than a stack pointing away from it.
    const z = (column - (COLUMNS - 1) / 2 + stagger) * 1.02
    return {
      key: i,
      position: [WALL_X, 0.5 + row * 1.02, z] as [number, number, number]
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-9, 5, 6]}
  fov={45}
>
  <OrbitControls
    enableDamping
    target={[7, 1.2, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  intensity={2}
  position={[8, 20, 6]}
  shadow.camera.top={20}
  shadow.camera.bottom={-20}
  shadow.camera.left={-20}
  shadow.camera.right={20}
  shadow.mapSize.width={2048}
  shadow.mapSize.height={2048}
/>
<T.AmbientLight intensity={1} />

<SoftShadows />

<!-- Still just a mesh. It looks like solid ground, but the simulation knows
     nothing about it, because a mesh is not a collider. -->
<T.Mesh
  receiveShadow
  position.y={-0.5}
>
  <T.BoxGeometry args={[120, 1, 120]} />
  <T.MeshStandardMaterial color="#4E5A46" />
</T.Mesh>

<Cannon aim={(18 * Math.PI) / 180} />

<!-- <RigidBody> hands something to the simulation and <Collider> gives it a
     shape to collide with. The bricks are physical now... and they fall
     straight through a floor that isn't.

     The cannon stays put, incidentally, for the opposite reason: it has no
     rigid body at all, so the simulation never touches it. -->
{#each bricks as brick (brick.key)}
  <T.Group position={brick.position}>
    <RigidBody>
      <Collider
        shape="cuboid"
        args={[0.5, 0.5, 0.5]}
      />
      <T.Mesh castShadow>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial color="#9C6B4E" />
      </T.Mesh>
    </RigidBody>
  </T.Group>
{/each}
