<script lang='ts'>

import * as THREE from 'three'
import { T, useFrame } from '@threlte/core'
import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
import { Controllers, Hands, useXR } from '$lib'
import { Collider, RigidBody } from '@threlte/rapier'

const { isHandTracking } = useXR()

let rigidBodyLeft: RapierRigidBody
let rigidBodyRight: RapierRigidBody

const sabers: { left: THREE.Mesh, right: THREE.Mesh } = { left: undefined!, right: undefined! }
const handSabers: { left: THREE.Mesh, right: THREE.Mesh } = { left: undefined!, right: undefined! }

const v3 = new THREE.Vector3()
const q = new THREE.Quaternion()

useFrame(() => {
  const left = isHandTracking.current ? handSabers.left : sabers.left 
  const right = isHandTracking.current ? handSabers.right : sabers.right

  if (left) {
    rigidBodyLeft.setTranslation(left.getWorldPosition(v3), true)
    rigidBodyLeft.setRotation(left.getWorldQuaternion(q), true)
  }

  if (right) {
    rigidBodyRight.setTranslation(right.getWorldPosition(v3), true)
    rigidBodyRight.setRotation(right.getWorldQuaternion(q), true)
  }
})

const saberRadius = 0.02
const saberLength = 1.4

</script>

<Controllers modelLeft='none' modelRight='none'>
  <T.Mesh
    slot='left'
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    on:create={({ ref }) => (sabers.left = ref)}
  >
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshPhongMaterial color='red' />
  </T.Mesh>
  <T.Mesh
    slot='right'
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    on:create={({ ref }) => (sabers.right = ref)}
  >
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshStandardMaterial roughness={0} color='red' />
  </T.Mesh>
</Controllers>

<Hands>
  <T.Mesh
    slot='left'
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    on:create={({ ref }) => (handSabers.left = ref)}
  >
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshStandardMaterial roughness={0} color='red' />
  </T.Mesh>
  <T.Mesh
    slot='right'
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    on:create={({ ref }) => (handSabers.right = ref)}
  >
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshPhongMaterial color='red' />
  </T.Mesh>
</Hands>

<RigidBody type='kinematicPosition' bind:rigidBody={rigidBodyLeft}>
  <Collider shape='capsule' args={[saberLength / 2, saberRadius]} />
</RigidBody>

<RigidBody type='kinematicPosition' bind:rigidBody={rigidBodyRight}>
  <Collider shape='capsule' args={[saberLength / 2, saberRadius]} />
</RigidBody>
