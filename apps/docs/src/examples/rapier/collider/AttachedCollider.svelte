<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
  import { Vector3 } from 'three'
  import TestBed from './TestBed.svelte'

  let rigidBody = $state.raw<RapierRigidBody>()

  const position = new Vector3(0, 1, 0)
  let elapsed = 0

  useTask((dt) => {
    elapsed += dt
    position.x = Math.sin(elapsed)
    position.z = Math.cos(elapsed)
    rigidBody?.setNextKinematicTranslation(position)
  })
</script>

<!-- ATTACHED COLLIDER -->
<T.Group position={[0, 2, 0]}>
  <RigidBody>
    <T.Mesh castShadow>
      <T.MeshStandardMaterial color={0xff3f00} />
      <T.BoxGeometry args={[2, 2, 2]} />
    </T.Mesh>
    <Collider
      shape="cuboid"
      args={[1, 1, 1]}
    />
  </RigidBody>
</T.Group>

<!-- TEST SPHERE -->
<T.Group position={[0, 1, 0]}>
  <RigidBody
    bind:rigidBody
    type="kinematicPosition"
    lockRotations
  >
    <AutoColliders shape="ball">
      <T.Mesh castShadow>
        <T.SphereGeometry args={[1]} />
        <T.MeshStandardMaterial />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

<TestBed title="Attached Collider">
  {#snippet text()}
    <div>
      <p>
        Nesting one or multiple {'<Collider>'} components in a {'<RigidBody>'} component effectively attaches
        the colliders to the rigid body and allow the rigid body to be affected by contact forces and
        gravity.
      </p>
    </div>
  {/snippet}
</TestBed>
