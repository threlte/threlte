<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { T, Three, useFrame } from '@threlte/core'
  import { Group, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { AttractorProps, AttractorSlots, AttractorEvents } from './Attractor.svelte'

  type $$Props = AttractorProps
  type $$Events = AttractorEvents
  type $$Slots = AttractorSlots

  export let strength: $$Props['strength'] = 1
  export let range: $$Props['range'] = 50
  export let gravityType: $$Props['gravityType'] = 'static'
  export let gravitationalConstant: $$Props['gravitationalConstant'] = 6.673e-11

  const { world, debug } = useRapier()
  const gravitySource = new Vector3()
  let obj = new Group()

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
  let:ref
  type={obj}
  {...$$restProps}
>
  <slot {ref} />

  {#if $debug}
    <T.Mesh>
      <T.SphereGeometry args={[range]} />
      <T.MeshBasicMaterial
        wireframe
        transparent
        opacity={0.25}
      />
    </T.Mesh>
  {/if}
</Three>
