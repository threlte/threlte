<script lang='ts'>

import { handJoints, useXRHandJoint } from '$lib'
import { useFrame } from '@threlte/core'
import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
import { Collider, RigidBody } from '@threlte/rapier'

export let jointIndex: number
export let hand: 'left' | 'right'

let body: RapierRigidBody

const joint = useXRHandJoint(hand, handJoints[jointIndex]!)

$: radius = joint.current?.jointRadius ?? 0.0001

useFrame(() => {
  if (joint.current === undefined || body === undefined) return

  const { x, y, z } = joint.current.position
  body.setNextKinematicTranslation({ x, y, z })
})

</script>

<RigidBody bind:rigidBody={body} type='kinematicPosition'>
  <Collider shape='ball' args={[radius]} />
</RigidBody>
