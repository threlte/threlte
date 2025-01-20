<script
  lang="ts"
  module
>
  const radius = 0.25
  const cuboid: Shape = {
    autoCollider: 'cuboid',
    color: 'hotpink',
    geometry: new BoxGeometry(radius, radius, radius)
  }

  const shapes: Shape[] = [
    cuboid,
    {
      autoCollider: 'ball',
      color: 'cyan',
      geometry: new SphereGeometry(radius)
    },
    {
      autoCollider: 'convexHull',
      color: 'green',
      geometry: new CylinderGeometry(radius, radius, radius * 2)
    },
    {
      autoCollider: 'convexHull',
      color: 'orange',
      geometry: new ConeGeometry(radius, radius * 3, 10)
    }
  ]

  const getRandomShape = (defaultShape = cuboid): Shape => {
    return shapes[Math.floor(Math.random() * shapes.length)] ?? defaultShape
  }
</script>

<script lang="ts">
  import type { AutoCollidersShapes } from '@threlte/rapier'
  import type { BufferGeometry, ColorRepresentation } from 'three'
  import type { Snippet } from 'svelte'
  import { AutoColliders, RigidBody } from '@threlte/rapier'
  import { BoxGeometry, ConeGeometry, CylinderGeometry, SphereGeometry, Vector3 } from 'three'
  import { T } from '@threlte/core'

  type Shape = {
    autoCollider: AutoCollidersShapes
    color: ColorRepresentation
    geometry: BufferGeometry
  }

  let { children }: { children?: Snippet<[{ shape: Shape }]> } = $props()

  const offset = new Vector3(-2.5, 2.5, -2.5)
  const createPosition = (scalar = 5): Vector3 => {
    return new Vector3().random().multiplyScalar(scalar).add(offset)
  }

  const createRotation = (scalar = 10): Vector3 => {
    return new Vector3().random().multiplyScalar(scalar)
  }

  type Body = {
    position: Vector3
    rotation: Vector3
  }

  const bodies: Body[] = []
  const count = 50
  for (let i = 0; i < count; i += 1) {
    const position = createPosition()
    const rotation = createRotation()

    bodies.push({
      position,
      rotation
    })
  }
</script>

{#each bodies as body}
  {@const shape = getRandomShape()}
  <T.Group
    position={body.position.toArray()}
    rotation={body.rotation.toArray()}
  >
    <RigidBody type="dynamic">
      <AutoColliders shape={shape.autoCollider}>
        {@render children?.({ shape })}
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/each}
