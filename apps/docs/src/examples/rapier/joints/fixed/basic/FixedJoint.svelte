<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { useFixedJoint } from '@threlte/rapier'
  import type { Vector3Tuple } from 'three'

  interface Props {
    bodyA: RapierRigidBody
    bodyB: RapierRigidBody
    anchorA: Vector3Tuple
    anchorB: Vector3Tuple
  }

  let { bodyA, bodyB, anchorA, anchorB }: Props = $props()

  const { rigidBodyA, rigidBodyB } = useFixedJoint(anchorA, [0, 0, 0], anchorB, [0, 0, 0])

  $effect(() => {
    rigidBodyA.set(bodyA)
    rigidBodyB.set(bodyB)
  })
</script>
