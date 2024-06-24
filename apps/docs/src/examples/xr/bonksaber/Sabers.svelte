<script lang="ts">
  import { Mesh, Vector3, Quaternion } from 'three'
  import { T, useTask } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { Controller, Hand, useXR } from '@threlte/xr'

  const { isHandTracking } = useXR()

  let rigidBodyLeft: RapierRigidBody
  let rigidBodyRight: RapierRigidBody

  const sabers: { left: Mesh; right: Mesh } = { left: undefined!, right: undefined! }
  const handSabers: { left: Mesh; right: Mesh } = {
    left: undefined!,
    right: undefined!
  }

  const v3 = new Vector3()
  const q = new Quaternion()

  useTask(() => {
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

<Controller left>
  <T.Mesh
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    oncreate={({ ref }) => (sabers.left = ref)}
  >
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshPhongMaterial color="red" />
  </T.Mesh>
</Controller>

<Controller right>
  <T.Mesh
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    oncreate={({ ref }) => (sabers.right = ref)}
  >
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshStandardMaterial
      roughness={0}
      color="red"
    />
  </T.Mesh>
</Controller>

<Hand left>
  {#snippet wrist()}
    <T.Mesh
      rotation.x={Math.PI / 2}
      position.z={-saberLength / 2}
      oncreate={({ ref }) => (handSabers.left = ref)}
    >
      <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
      <T.MeshStandardMaterial
        roughness={0}
        color="red"
      />
    </T.Mesh>
  {/snippet}
</Hand>

<Hand right>
  {#snippet wrist()}
    <T.Mesh
      rotation.x={Math.PI / 2}
      position.z={-saberLength / 2}
      oncreate={({ ref }) => (handSabers.right = ref)}
    >
      <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
      <T.MeshPhongMaterial color="red" />
    </T.Mesh>
  {/snippet}
</Hand>

<RigidBody
  type="kinematicPosition"
  bind:rigidBody={rigidBodyLeft}
>
  <Collider
    shape="capsule"
    args={[saberLength / 2, saberRadius]}
  />
</RigidBody>

<RigidBody
  type="kinematicPosition"
  bind:rigidBody={rigidBodyRight}
>
  <Collider
    shape="capsule"
    args={[saberLength / 2, saberRadius]}
  />
</RigidBody>
