<script lang='ts'>
  import { useFrame } from '@threlte/core'
  import { handJoints, useHandJoint } from '@threlte/xr'
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { Collider, RigidBody } from '@threlte/rapier'

  export let jointIndex: number
  export let hand: 'left' | 'right'

  let body: RapierRigidBody

  const joint = useHandJoint(hand, handJoints[jointIndex]!)

  const { start, stop } = useFrame(() => {
    if (joint.current === undefined || body === undefined) return

    const { x, y, z } = joint.current.position
    body.setNextKinematicTranslation({ x, y, z })
  }, { autostart: false })

  $: radius = $joint?.jointRadius

  $: if (body && radius && $joint) {
    start()
  } else {
    stop()
  }
</script>

{#if radius}
  <RigidBody bind:rigidBody={body} type='kinematicPosition'>
    <Collider shape='ball' args={[radius]} />
  </RigidBody>
{/if}
