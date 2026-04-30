<script lang="ts">
  import { Vector3 } from 'three'
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { InstancedMesh, Instance, RoundedBoxGeometry, Outlines } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'

  interface Props {
    playing: boolean
    oncomplete: () => void
  }

  let { playing, oncomplete }: Props = $props()

  const colors = [
    '#ff5252',
    '#ff4081',
    '#d500f9',
    '#3d5afe',
    '#40c4ff',
    '#18ffff',
    '#f9a825',
    '#ffd740',
    '#bf360c'
  ] as const

  const positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ] as const

  type Block = {
    position: Vector3
    color: string
  }

  let cubes: Block[] = []
  const numCubes = 100
  const margin = 0.4
  const spacing = 8

  for (let i = 0; i < numCubes; i += 1) {
    const [x, y] = positions[Math.trunc(Math.random() * positions.length)]!
    cubes.push({
      position: new Vector3(x - margin, y - margin, -i * spacing),
      color: colors[i % colors.length]!
    })
  }

  const boxRadius = 0.15
  const boxSize = 0.6
  const offsetY = 1.8
  const offsetZ = 50
  const speed = 9
  const passedZ = 3

  const bodies = $state<RapierRigidBody[]>([])

  $effect(() => {
    if (!playing) return
    for (let i = 0; i < numCubes; i += 1) {
      const body = bodies[i]
      if (!body) continue
      const spawn = cubes[i]!.position
      body.setTranslation({ x: spawn.x, y: spawn.y + offsetY, z: spawn.z - offsetZ }, true)
      body.setLinvel({ x: 0, y: 0, z: speed }, true)
    }
  })

  useTask(() => {
    if (!playing) return
    let passed = 0
    for (const body of bodies) {
      if (body && body.translation().z > passedZ) passed += 1
    }
    if (passed === numCubes) {
      for (const body of bodies) body?.setLinvel({ x: 0, y: 0, z: 0 }, true)
      oncomplete()
    }
  })
</script>

<InstancedMesh limit={numCubes}>
  <RoundedBoxGeometry
    radius={boxRadius}
    args={[boxSize, boxSize, boxSize]}
  />
  <T.MeshStandardMaterial
    roughness={0}
    metalness={0.2}
  />

  <Outlines />

  {#each cubes as { position, color }, index (index)}
    <T.Group
      position.x={position.x}
      position.y={position.y + offsetY}
      position.z={position.z - offsetZ}
    >
      <RigidBody bind:rigidBody={bodies[index]}>
        <Collider
          shape="cuboid"
          mass={0.5}
          args={[boxSize / 2, boxSize / 2, boxSize / 2]}
        />
        <Instance {color} />
      </RigidBody>
    </T.Group>
  {/each}
</InstancedMesh>
