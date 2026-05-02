<script lang="ts">
  import { Vector3, Quaternion, Group } from 'three'
  import { T, useTask } from '@threlte/core'
  import { FakeGlowMaterial, Outlines } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { Controller, Hand, useController, useXR } from '@threlte/xr'

  const { isHandTracking } = useXR()

  const leftController = useController('left')
  const rightController = useController('right')

  const pulse = (hand: 'left' | 'right') => {
    const controller = hand === 'left' ? leftController.current : rightController.current
    controller?.inputSource.gamepad?.hapticActuators[0]?.pulse(0.8, 80)
  }

  let rigidBodyLeft = $state.raw<RapierRigidBody>()
  let rigidBodyRight = $state.raw<RapierRigidBody>()

  const leftSaber = new Group()
  const rightSaber = new Group()
  const leftHandSaber = new Group()
  const rightHandSaber = new Group()

  const left = $derived(isHandTracking.current ? leftHandSaber : leftSaber)
  const right = $derived(isHandTracking.current ? rightHandSaber : rightSaber)

  const vec3 = new Vector3()
  const quaternion = new Quaternion()

  useTask(() => {
    rigidBodyLeft?.setTranslation(left.getWorldPosition(vec3), true)
    rigidBodyLeft?.setRotation(left.getWorldQuaternion(quaternion), true)
    rigidBodyRight?.setTranslation(right.getWorldPosition(vec3), true)
    rigidBodyRight?.setRotation(right.getWorldQuaternion(quaternion), true)
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
  <T
    is={leftSaber}
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
  >
    {@render saber()}
  </T>
</Controller>

<Controller right>
  <T
    is={rightSaber}
    rotation.x={Math.PI / 2}
    position.z={-saberLength / 2}
  >
    {@render saber()}
  </T>
</Controller>

<Hand left>
  {#snippet wrist()}
    <T
      is={leftHandSaber}
      rotation.x={Math.PI / 2}
      position.z={-saberLength / 2}
    >
      {@render saber()}
    </T>
  {/snippet}
</Hand>

<Hand right>
  {#snippet wrist()}
    <T
      is={rightHandSaber}
      rotation.x={Math.PI / 2}
      position.z={-saberLength / 2}
    >
      {@render saber()}
    </T>
  {/snippet}
</Hand>

<RigidBody
  type="kinematicPosition"
  bind:rigidBody={rigidBodyLeft}
  oncollisionenter={() => pulse('left')}
>
  <Collider
    shape="capsule"
    args={[saberLength / 2, saberRadius]}
  />
</RigidBody>

<RigidBody
  type="kinematicPosition"
  bind:rigidBody={rigidBodyRight}
  oncollisionenter={() => pulse('right')}
>
  <Collider
    shape="capsule"
    args={[saberLength / 2, saberRadius]}
  />
</RigidBody>
