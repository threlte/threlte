<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Cannon from '../shared/Cannon.svelte'
  import { createWall } from '../shared/wall'

  let { debug }: { debug: boolean } = $props()

  const bricks = createWall()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-9, 5, 6]}
  fov={45}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
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
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
/>
<T.AmbientLight intensity={1} />

<SoftShadows />

<!-- Switch this on to see the colliders the simulation is actually using. -->
{#if debug}
  <Debug />
{/if}

<!-- The ground never moves, so it is a fixed body. Note the collider is offset
     to sit where the mesh sits: a collider does not follow its mesh, they are
     positioned independently. -->
<RigidBody type="fixed">
  <T.Group position.y={-0.5}>
    <Collider
      shape="cuboid"
      args={[60, 0.5, 60]}
      friction={1}
    />
  </T.Group>
  <T.Mesh
    receiveShadow
    position.y={-0.5}
  >
    <T.BoxGeometry args={[120, 1, 120]} />
    <T.MeshStandardMaterial color="#4E5A46" />
  </T.Mesh>
</RigidBody>

<!-- The carriage never moves, so it is a fixed body. One box collider stands in
     for the whole assembly: colliders do not have to match the meshes. -->
<RigidBody type="fixed">
  <T.Group position.y={0.45}>
    <Collider
      shape="cuboid"
      args={[1, 0.45, 0.6]}
    />
  </T.Group>
  <Cannon aim={(18 * Math.PI) / 180} />
</RigidBody>

<!-- Now that every brick has a collider, the wall stands. -->
{#each bricks as brick (brick.key)}
  <T.Group position={brick.position}>
    <RigidBody>
      <Collider
        shape="cuboid"
        args={[0.5, 0.5, 0.5]}
        friction={0.8}
        restitution={0}
      />
      <T.Mesh castShadow>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial color="#9C6B4E" />
      </T.Mesh>
    </RigidBody>
  </T.Group>
{/each}
