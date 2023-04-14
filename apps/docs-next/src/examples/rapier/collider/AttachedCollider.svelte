<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useFrame } from '@threlte/core'
  import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
  import { BoxGeometry, Color, MeshStandardMaterial, SphereGeometry } from 'three'
  import TestBed from './TestBed.svelte'

  const material = new MeshStandardMaterial({ color: new Color(0xff3f00) })

  let rigidBody: RapierRigidBody
  let positionZ = 0
  let positionX = 0
  const offset = Date.now()

  useFrame(() => {
    if (!rigidBody) return
    positionZ = Math.sin(Date.now() / 2000) * 2.5
    positionX = Math.sin((Date.now() + offset) / 1500) * 1.2
    rigidBody.setNextKinematicTranslation({ x: positionX, y: 1, z: positionZ })
  })
</script>

<!-- ATTACHED COLLIDER -->
<T.Group position={[0, 2, 0]}>
  <RigidBody>
    <T.Mesh
      castShadow
      geometry={new BoxGeometry(2, 2, 2)}
      {material}
    />
    <Collider
      shape={'cuboid'}
      args={[1, 1, 1]}
    />
  </RigidBody>
</T.Group>

<!-- TEST SPHERE -->
<T.Group position={[0, 1, 0]}>
  <RigidBody
    bind:rigidBody
    type={'kinematicPosition'}
    lockRotations
  >
    <AutoColliders shape={'ball'}>
      <T.Mesh
        castShadow
        geometry={new SphereGeometry(1)}
        material={new MeshStandardMaterial()}
      />
    </AutoColliders>
  </RigidBody>
</T.Group>

<TestBed title={'Attached Collider'}>
  <div slot="text">
    <p>
      Nesting one or multiple {'<Collider>'} components in a {'<RigidBody>'} component effectively attaches
      the colliders to the rigid body and allow the rigid body to be affected by contact forces and gravity.
    </p>

    <p>
      If a collider is attached to a {'<RigidBody>'} its transform properties are applied once on initialization.
    </p>
  </div>
</TestBed>
