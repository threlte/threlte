<script lang='ts'>

import * as THREE from 'three'
import { T } from '@threlte/core'
import { InstancedMesh, Instance, RoundedBoxGeometry } from '@threlte/extras'
import { Collider, RigidBody, CollisionGroups } from '@threlte/rapier'
import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

const colors = ['#ff5252', '#ff4081', '#d500f9', '#3d5afe', '#40c4ff', '#18ffff', '#f9a825', '#ffd740', '#bf360c'] as const
const positions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]] as const

type Block = {
  position: THREE.Vector3
  color: string
}

type Particle = {
  position: THREE.Vector3
  force: THREE.Vector3
}

let particleGroup: Particle[] = []

let visible: boolean[] = []
let cubes: Block[] = []
let numCubes = 100
let numParticles = 1000
const margin = 0.4
const spacing = 8

for (let i = 0; i < numCubes; i += 1) {
  const [x, y] = positions[Math.trunc(Math.random() * positions.length)]!
  cubes.push({
    position: new THREE.Vector3(x - margin, y - margin, -i * spacing),
    color: colors[i % colors.length]!
  })
  visible.push(true)
}

const boxRadius = 0.15
const boxSize = 0.6
const offsetY = 1.5
const offsetZ = 50
const speed = 12
const particleSize = boxSize / 4
const particleRadius = boxRadius / 4

const handleContact = (index: number, event: any) => {
  return
  console.log('contact')
  visible[index] = false

  const rb = event.targetRigidBody as RapierRigidBody
  const force = event.maxForceDirection as THREE.Vector3
  const t = rb.translation()
  const position = new THREE.Vector3().set(t.x, t.y, t.z)
  particleGroup.push({ force, position })

  if (particleGroup.length > 8) particleGroup.shift()

  particleGroup = particleGroup

  console.log('group', particleGroup)
}

const getRandomForce = (force) => {
  const x = Math.random() - 0.5
  const y = Math.random() - 0.5
  const z = Math.random() - 0.5
  return [force.x * x * 10, force.y * y * 10, force.z * z * 10] as [number, number, number]
}

</script>

<InstancedMesh limit={numCubes}>
  <RoundedBoxGeometry radius={boxRadius} args={[boxSize, boxSize, boxSize]} />
  <T.MeshStandardMaterial roughness={0} metalness={0.2} />

  {#each cubes as { position, color }, index (index)}
    <T.Group
      position.x={position.x}
      position.y={position.y + offsetY}
      position.z={position.z - offsetZ}
    >
      <RigidBody
        enabled={visible[index] ?? true}
        linearVelocity={[0, 0, speed]}
        on:contact={(event) => handleContact(index, event)}
      >
        <Collider shape='cuboid' mass={0.5} args={[boxSize / 2, boxSize / 2, boxSize / 2]} />
        {#if visible[index]}
          <Instance {color} />
        {/if}
      </RigidBody>
    </T.Group>
  {/each}
</InstancedMesh>

<CollisionGroups
  memberships={[]}
  filter={[]}
>
  <InstancedMesh limit={numParticles}>
    <T.BoxGeometry args={[particleSize, particleSize, particleSize]} />
    <T.MeshPhongMaterial />

    {#each particleGroup as { position, force }, index (index)}
      <T.Group
        position.x={position.x}
        position.y={position.y}
        position.z={position.z}
      >
        {#each { length: 20 } as _}
          <RigidBody linearVelocity={getRandomForce(force)}>
            <Collider shape='cuboid' mass={0.5} args={[particleSize / 2, particleSize / 2, particleSize / 2]} />
            <Instance color='#ffffff' />
          </RigidBody>
        {/each}
      </T.Group>
    {/each}
  </InstancedMesh>
</CollisionGroups>