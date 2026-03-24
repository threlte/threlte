<script lang="ts">
  import type { RigidBody as RapierRigidBody, Vector } from '@dimforge/rapier3d-compat'
  import { useTask } from '@threlte/core'
  import { useRapier } from '@threlte/rapier'
  import { Vector3 } from 'three'

  let {
    rigidBody,
    angularMax,
    linearMax,
    onstatic
  }: {
    rigidBody: RapierRigidBody
    angularMax: number
    linearMax: number
    onstatic: () => void
  } = $props()

  const rapier = useRapier()

  const vector3 = new Vector3()

  const isStatic = (v: Vector, max: number) => {
    vector3.set(v.x, v.y, v.z)
    return vector3.length() < max
  }

  useTask(
    () => {
      if (isStatic(rigidBody.angvel(), angularMax) && isStatic(rigidBody.linvel(), linearMax)) {
        onstatic()
      }
    },
    {
      after: rapier.simulationTask
    }
  )
</script>
