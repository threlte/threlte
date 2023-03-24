<script lang="ts">
  import type {
    RevoluteImpulseJoint,
    RigidBody as RapierRigidBody
  } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { Collider, RigidBody, useFixedJoint, useRevoluteJoint } from '@threlte/rapier'
  import { spring } from 'svelte/motion'
  import { clamp, DEG2RAD, mapLinear } from 'three/src/math/MathUtils'
  import type { AxleProps } from './Axle.svelte'
  import { useCar } from './useCar'
  import { useWasd } from './useWasd'
  import Wheel from './Wheel.svelte'

  type $$Props = AxleProps

  export let side: $$Props['side']
  export let anchor: $$Props['anchor']

  export let parentRigidBody: $$Props['parentRigidBody'] = undefined
  export let isSteered: $$Props['isSteered'] = false
  export let isDriven: $$Props['isDriven'] = false

  let axleRigidBody: RapierRigidBody

  const wasd = useWasd()
  const { speed } = useCar()

  const steeringAngle = spring(mapLinear(clamp($speed / 12, 0, 1), 0, 1, 1, 0.5) * $wasd.x * 15)
  $: steeringAngle.set(mapLinear(clamp($speed / 12, 0, 1), 0, 1, 1, 0.5) * $wasd.x * 15)

  const { joint, rigidBodyA, rigidBodyB } = isSteered
    ? useRevoluteJoint(anchor, [0, 0, 0], [0, 1, 0])
    : useFixedJoint(anchor, [0, 0, 0], [0, 0, 0], [0, 0, 0])
  $: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
  $: if (axleRigidBody) rigidBodyB.set(axleRigidBody)
  $: $joint?.setContactsEnabled(false)
  $: if (isSteered) {
    ;($joint as RevoluteImpulseJoint)?.configureMotorPosition(
      $steeringAngle * -1 * DEG2RAD,
      1000000,
      0
    )
  }
</script>

<T.Group {...$$restProps}>
  <RigidBody bind:rigidBody={axleRigidBody}>
    <Collider
      mass={1}
      shape={'cuboid'}
      args={[0.03, 0.03, 0.03]}
    />
  </RigidBody>

  <Wheel
    {isDriven}
    anchor={[0, 0, side === 'left' ? 0.2 : -0.2]}
    position={[0, 0, side === 'left' ? 0.2 : -0.2]}
    parentRigidBody={axleRigidBody}
  />
</T.Group>
