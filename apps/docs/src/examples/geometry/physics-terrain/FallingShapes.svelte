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
  import { Quaternion, type BufferGeometry, type ColorRepresentation } from 'three'
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

  type Body = {
    position: Vector3
    quaternion: Quaternion
  }

  const bodies: Body[] = []
  const count = 50
  for (let i = 0; i < count; i += 1) {
    bodies.push({
      position: new Vector3().random().multiplyScalar(5).add(offset),
      quaternion: new Quaternion().random()
    })
  }
</script>

{#each bodies as body}
  {@const shape = getRandomShape()}
  <T.Group
    position={body.position.toArray()}
    quaternion={body.quaternion.toArray()}
  >
    <RigidBody type="dynamic">
      <AutoColliders shape={shape.autoCollider}>
        {@render children?.({ shape })}
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/each}
