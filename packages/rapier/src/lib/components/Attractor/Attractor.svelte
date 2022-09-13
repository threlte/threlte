<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { Mesh, useFrame } from '@threlte/core'
  import { SphereBufferGeometry } from 'three'
  import { MeshBasicMaterial } from 'three'
  import { Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { AttractorProperties } from '../../types/components'

  const { world } = useRapier()

  export let position: AttractorProperties['position'] = { x: 0, y: 0, z: 0 }
  export let strength: NonNullable<AttractorProperties['strength']> = 1
  export let range: NonNullable<AttractorProperties['range']> = 10
  export let showHelper: AttractorProperties['showHelper'] = false

  const gravitySource = new Vector3(position?.x, position?.y, position?.z)

  function applyImpulseToBodiesInRange() {
    const impulseVector = new Vector3()
    world.forEachActiveRigidBody((body: RigidBody) => {
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
