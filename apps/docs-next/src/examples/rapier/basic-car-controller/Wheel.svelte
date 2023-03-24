<script lang="ts">
  import {
    MotorModel,
    type Collider as RapierCollider,
    type RigidBody as RapierRigidBody
  } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { Collider, RigidBody, useRevoluteJoint } from '@threlte/rapier'
  import type { Vector3 } from 'three'
  import { CylinderGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { useWasd } from './useWasd'

  export let position: Parameters<Vector3['set']>
  export let parentRigidBody: RapierRigidBody | undefined = undefined
  export let anchor: Parameters<Vector3['set']>
  let collider: RapierCollider
  export let isDriven = false

  const wasd = useWasd()

  let isSpaceDown = false

  const { rigidBodyA, rigidBodyB, joint } = useRevoluteJoint(anchor, [0, 0, 0], [0, 0, 1])
  $: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
  $: $joint?.configureMotorModel(MotorModel.AccelerationBased)
  $: $joint?.configureMotorModel(
    isDriven && isSpaceDown ? MotorModel.ForceBased : MotorModel.AccelerationBased
  )
  $: if (isDriven) $joint?.configureMotorVelocity(isSpaceDown ? 0 : $wasd.y * 2000, 10)
  $: $joint?.setContactsEnabled(false)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault()
      isSpaceDown = true
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault()
      isSpaceDown = false
    }
  }
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>

<T.Group {position}>
  <RigidBody
    canSleep={false}
    bind:rigidBody={$rigidBodyB}
  >
    <T.Group rotation={[90 * DEG2RAD, 0, 0]}>
      <Collider
        mass={1}
        friction={1.5}
        shape={'cylinder'}
        args={[0.12, 0.3]}
        bind:collider
      />
    </T.Group>

    <!-- WHEEL MESH -->
    <T.Mesh
      castShadow
      rotation.x={90 * DEG2RAD}
      geometry={new CylinderGeometry(0.3, 0.3, 0.24)}
      material={new MeshStandardMaterial()}
    />
  </RigidBody>
</T.Group>
