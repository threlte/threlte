<script lang="ts">
  import { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { observe, T, useTask } from '@threlte/core'
  import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
  import { Collider, RigidBody, useRapier, useRopeJoint } from '@threlte/rapier'
  import { Vector3, type Vector3Tuple } from 'three'

  type Props = {
    segments: number
    ropeStart: Vector3Tuple
    ropeEnd: Vector3Tuple
    length: number
    ballRadius: number
    damping: number
  }

  let { segments, ropeStart, ropeEnd, length, ballRadius, damping }: Props = $props()

  const { simulationStage, simulationTask } = useRapier()

  const lengthBetweenSegments = length / (segments - 1)

  let jointsInitialized = $state(false)

  // make new Array with segments - 1 elements
  const joints = Array.from({ length: segments - 1 }, () => {
    return useRopeJoint([0, 0, 0], [0, 0, 0], lengthBetweenSegments)
  })

  const rigidBodies = $state<RapierRigidBody[]>([])

  const start = new Vector3().fromArray(ropeStart)
  const end = new Vector3().fromArray(ropeEnd)

  const getIntialRigidBodyPosition = (index: number) => {
    const t = index / (segments - 1)
    return start.clone().lerp(end, t)
  }

  $effect(() => {
    if (rigidBodies.length !== segments) return
    if (jointsInitialized) return

    joints.forEach((joint, index) => {
      joint.rigidBodyA.set(rigidBodies[index])
      joint.rigidBodyB.set(rigidBodies[index + 1])
    })

    jointsInitialized = true
  })

  let points = $state(
    Array.from({ length: segments }, () => {
      return new Vector3(0, 0, 0)
    })
  )

  useTask(
    () => {
      if (!jointsInitialized) return
      for (let i = 0; i < segments; i++) {
        const rb = rigidBodies[i]
        if (!rb) continue
        const translation = rb.translation()
        points[i]!.set(translation.x, translation.y, translation.z)
      }
      points = [...points]
    },
    {
      stage: simulationStage,
      before: simulationTask
    }
  )

  observe(
    () => [jointsInitialized, ropeStart, ropeEnd],
    ([jointsInitialized]) => {
      if (!jointsInitialized) return
      rigidBodies.at(0)!.setTranslation({ x: ropeStart[0], y: ropeStart[1], z: ropeStart[2] }, true)
      rigidBodies.at(-1)!.setTranslation({ x: ropeEnd[0], y: ropeEnd[1], z: ropeEnd[2] }, true)
    }
  )
</script>

{#each { length: segments } as _, i (i)}
  <T.Group
    oncreate={(ref) => {
      ref.position.copy(getIntialRigidBodyPosition(i))
    }}
  >
    <RigidBody
      linearDamping={damping}
      angularDamping={damping}
      type={i === 0 || i === segments - 1 ? 'fixed' : 'dynamic'}
      bind:rigidBody={rigidBodies[i]}
    >
      <Collider
        shape="ball"
        args={[ballRadius]}
      >
        <T.Object3D />
      </Collider>
    </RigidBody>
  </T.Group>
{/each}

<T.Mesh>
  <MeshLineGeometry
    {points}
    shape="none"
  />
  <MeshLineMaterial
    width={0.4}
    color="#FE3D00"
  />
</T.Mesh>
