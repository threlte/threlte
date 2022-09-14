<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { Mesh, useFrame, Object3DInstance } from '@threlte/core'
  import { SphereBufferGeometry, MeshBasicMaterial, Vector3, Object3D } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { AttractorProperties } from '../../types/components'

  export let position: AttractorProperties['position'] = undefined
  export let strength: NonNullable<AttractorProperties['strength']> = 1
  export let range: NonNullable<AttractorProperties['range']> = 10
  export let showHelper: AttractorProperties['showHelper'] = false

  const { world } = useRapier()
  const gravitySource = new Vector3()
  let obj = new Object3D()

  function applyImpulseToBodiesInRange() {
    const impulseVector = new Vector3()
    obj.getWorldPosition(gravitySource)

    world.forEachRigidBody((body: RigidBody) => {
      const { x, y, z } = body.translation()
      const bodyV3: Vector3 = new Vector3(x, y, z)
      const distance: number = gravitySource.distanceTo(bodyV3)
      if (distance < range) {
        impulseVector.subVectors(gravitySource, bodyV3).normalize().multiplyScalar(strength)
        body.applyImpulse(impulseVector, true)
      }
    })
  }

  useFrame(() => {
    applyImpulseToBodiesInRange()
  })
</script>

<Object3DInstance bind:object={obj} {position} />

{#if showHelper}
  <Mesh
    geometry={new SphereBufferGeometry(range)}
    material={new MeshBasicMaterial({ wireframe: true })}
    {position}
  />
  <Mesh
    geometry={new SphereBufferGeometry()}
    material={new MeshBasicMaterial({ color: 'black', wireframe: false })}
    {position}
  />
{/if}
