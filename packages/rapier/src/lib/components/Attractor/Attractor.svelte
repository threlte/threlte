<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { Group, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { AttractorProps, AttractorSlots, AttractorEvents } from './Attractor.svelte'

  type $$Props = AttractorProps
  type DefaultProps = Required<$$Props>
  type $$Events = AttractorEvents
  type $$Slots = AttractorSlots

  export let strength: DefaultProps['strength'] = 1
  export let range: DefaultProps['range'] = 50
  export let gravityType: DefaultProps['gravityType'] = 'static'
  export let gravitationalConstant: DefaultProps['gravitationalConstant'] = 6.673e-11

  const { world, debug } = useRapier()
  const gravitySource = new Vector3()
  let obj = new Group()

  const calcForceByType = {
    static: (s: number, m2: number, r: number, d: number, G: number): number => s,
    linear: (s: number, m2: number, r: number, d: number, G: number) => s * (d / r),
    newtonian: (s: number, m2: number, r: number, d: number, G: number) =>
      (G * s * m2) / Math.pow(d, 2)
  }

  const impulseVector = new Vector3()
  const bodyV3 = new Vector3()

  function applyImpulseToBodiesInRange() {
    obj.getWorldPosition(gravitySource)

    world.forEachRigidBody((body: RigidBody) => {
      const { x, y, z } = body.translation()
      bodyV3.set(x, y, z)

      const distance = gravitySource.distanceToSquared(bodyV3)
      if (distance < range ** 2) {
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

  useTask(() => {
    applyImpulseToBodiesInRange()
  })
</script>

<T
  let:ref
  is={obj}
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
</T>
