<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'
  import Cannon from '../shared/Cannon.svelte'
  import { createWall } from '../shared/wall'

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
