<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { Mesh, useFrame, Three } from '@threlte/core'
  import { SphereGeometry, MeshBasicMaterial, Vector3, Object3D } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { AttractorProps } from './Attractor.svelte'

  type Props = AttractorProps

  export let position: Props['position'] = undefined
  export let strength: Props['strength'] = 1
  export let range: Props['range'] = 50
  export let gravityType: Props['gravityType'] = 'static'
  export let gravitationalConstant: Props['gravitationalConstant'] = 6.673e-11

  const { world, debug } = useRapier()
  const gravitySource = new Vector3()
  let obj = new Object3D()

  const calcForceByType = {
    static: (s: number, m2: number, r: number, d: number, G: number): number => s,
    linear: (s: number, m2: number, r: number, d: number, G: number) => s * (d / r),
    newtonian: (s: number, m2: number, r: number, d: number, G: number) =>
      (G * s * m2) / Math.pow(d, 2)
  }

  function applyImpulseToBodiesInRange() {
    const impulseVector = new Vector3()
    obj.getWorldPosition(gravitySource)

    world.forEachRigidBody((body: RigidBody) => {
      const { x, y, z } = body.translation()
      const bodyV3: Vector3 = new Vector3(x, y, z)
      const distance: number = gravitySource.distanceTo(bodyV3)
      if (distance < range) {
        let force = calcForceByType[gravityType](
          strength,
          body.mass(),
          range,
          distance,
          gravitationalConstant
        )
        // Prevent wild forces when Attractors collide
        force = force === Infinity ? strength : force
        impulseVector.subVectors(gravitySource, bodyV3).normalize().multiplyScalar(force)
        body.applyImpulse(impulseVector, true)
      }
    })
  }

  useFrame(() => {
    applyImpulseToBodiesInRange()
  })
</script>

<Three
  bind:type={obj}
  position={position?.x && position.y && position.z
    ? [position.x, position.y, position.z]
    : undefined}
>
  <slot />

  {#if $debug}
    <Mesh
      geometry={new SphereGeometry(range)}
      material={new MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.25 })}
    />
  {/if}
</Three>
