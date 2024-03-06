<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody, AutoColliders } from '@threlte/rapier'
  import { BoxGeometry, SphereGeometry, CylinderGeometry, ConeGeometry } from 'three'

  const radius = 0.25
  const shapes = [
    {
      geometry: new BoxGeometry(radius, radius, radius),
      autoCollider: 'cuboid',
      color: 'hotpink'
    },
    {
      geometry: new SphereGeometry(radius),
      autoCollider: 'ball',
      color: 'cyan'
    },
    {
      geometry: new CylinderGeometry(radius, radius, radius * 2),
      autoCollider: 'convexHull',
      color: 'green'
    },
    {
      geometry: new ConeGeometry(radius, radius * 3, 10),
      autoCollider: 'convexHull',
      color: 'orange'
    }
  ]

  const bodies = new Array(50).fill(0).map((_, index) => {
    const position: Parameters<Vector3['set']> = [
      Math.random() * 5 - 2.5,
      Math.random() * 5,
      Math.random() * 5 - 2.5
    ]
    const rotation: Parameters<Euler['set']> = [
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10
    ]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]

    return {
      id: index,
      position,
      rotation,
      ...shape
    }
  })
</script>

{#each bodies as body (body.id)}
  <T.Group
    position={body.position}
    rotation={body.rotation}
  >
    <RigidBody type={'dynamic'}>
      <AutoColliders shape={body.autoCollider}>
        <T.Mesh
          castShadow
          receiveShadow
          geometry={body.geometry}
        >
          <T.MeshStandardMaterial color={body.color} />
        </T.Mesh>
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/each}
