<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useFrame } from '@threlte/core'
  import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
  import { Color, MeshStandardMaterial, SphereGeometry } from 'three'
  import TestBed from './TestBed.svelte'

  const gray = new Color(0x333333)
  const brand = new Color(0xff3f00)

  const material = new MeshStandardMaterial({ color: gray })

  let present = false
  $: material.color = present ? brand : gray

  let rigidBody: RapierRigidBody
  let positionZ = 0
  let positionX = 0
  const offset = Date.now()

  useFrame(() => {
    if (!rigidBody) return
    positionZ = Math.sin(Date.now() / 2000) * 2.5
    positionX = Math.sin((Date.now() + offset) / 1500) * 1.2
    rigidBody.setNextKinematicTranslation({ x: positionX, y: 1, z: positionZ })
  })
</script>

<!-- SENSOR -->
<T.Group position={[0, 1, 0]}>
  <Collider
    on:sensorenter={() => (present = true)}
    on:sensorexit={() => (present = false)}
    sensor
    shape={'cuboid'}
    args={[1, 1, 1]}
  />
</T.Group>

<T.Group position={[0, 1, 0]}>
  <RigidBody
    bind:rigidBody
    type={'kinematicPosition'}
    lockRotations
  >
    <AutoColliders shape={'ball'}>
      <T.Mesh
        castShadow
        geometry={new SphereGeometry(1)}
        {material}
      />
    </AutoColliders>
  </RigidBody>
</T.Group>

<TestBed title={'Sensor Collider'}>
  <div slot="text">
    <p>
      This collider is marked as a sensor and as such does<br />
      not participate in contacts and collisions and can be<br />
      useful to detect presence in areas.
    </p>
  </div>
</TestBed>
