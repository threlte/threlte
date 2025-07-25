<script lang="ts">
  import { Vector3, Quaternion, Group } from 'three'
  import { T, useTask } from '@threlte/core'
  import { FakeGlowMaterial, Outlines } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { Controller, Hand, useXR } from '@threlte/xr'

  const { isHandTracking } = useXR()

  let rigidBodyLeft = $state.raw<RapierRigidBody>()
  let rigidBodyRight = $state.raw<RapierRigidBody>()
  let leftSaber = $state.raw<Group>()
  let rightSaber = $state.raw<Group>()
  let leftHandSaber = $state.raw<Group>()
  let rightHandSaber = $state.raw<Group>()

  const left = $derived($isHandTracking ? leftHandSaber : leftSaber)
  const right = $derived($isHandTracking ? rightHandSaber : rightSaber)

  const vec3 = new Vector3()
  const quaternion = new Quaternion()

  useTask(() => {
    if (left) {
      rigidBodyLeft?.setTranslation(left.getWorldPosition(vec3), true)
      rigidBodyLeft?.setRotation(left.getWorldQuaternion(quaternion), true)
    }

    if (right) {
      rigidBodyRight?.setTranslation(right.getWorldPosition(vec3), true)
      rigidBodyRight?.setRotation(right.getWorldQuaternion(quaternion), true)
    }
  })

  const saberRadius = 0.02
  const saberLength = 1.4
</script>

{#snippet saber()}
  <T.Mesh>
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <T.MeshBasicMaterial color="red" />
  </T.Mesh>

  <T.Mesh position={[0, saberLength / 2 + 0.05, 0]}>
    <T.CylinderGeometry args={[saberRadius, saberRadius, 0.1]} />
    <T.MeshStandardMaterial
      color="gray"
      roughness={0}
      metalness={0.5}
    />
  </T.Mesh>

  <T.Mesh>
    <T.CylinderGeometry args={[saberRadius, saberRadius, saberLength]} />
    <FakeGlowMaterial glowColor="red" />

    <Outlines
      color="hotpink"
      thickness={0.005}
    />
  </T.Mesh>
{/snippet}

<Controller left>
  <T.Group
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    bind:ref={leftSaber}
  >
    {@render saber()}
  </T.Group>
</Controller>

<Controller right>
  <T.Group
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
    bind:ref={rightSaber}
  >
    {@render saber()}
  </T.Group>
</Controller>

<Hand left>
  {#snippet wrist()}
    <T.Group
      rotation.x={Math.PI / 2}
      position.z={-saberLength / 2}
      bind:ref={leftHandSaber}
    >
      {@render saber()}
    </T.Group>
  {/snippet}
</Hand>

<Hand right>
  {#snippet wrist()}
    <T.Group
      rotation.x={Math.PI / 2}
      position.z={-saberLength / 2}
      bind:ref={rightHandSaber}
    >
      {@render saber()}
    </T.Group>
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
