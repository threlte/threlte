<script lang="ts" context="module">
  import {
    Ball,
    Collider,
    ConvexPolyhedron,
    Cuboid,
    Cylinder,
    ShapeType,
    TriMesh
  } from '@dimforge/rapier3d-compat'
  import { BufferGeometry } from 'three'
  import { CylinderBufferGeometry } from 'three'
  import { BufferAttribute } from 'three'
  import { SphereBufferGeometry } from 'three'
  import { BoxBufferGeometry } from 'three'

  const geometryFromCollider = (collider: Collider) => {
    switch (collider.shape.type) {
      case ShapeType.Cuboid: {
        const { x, y, z } = (collider.shape as Cuboid).halfExtents
        return new BoxBufferGeometry(x * 2 + 0.01, y * 2 + 0.01, z * 2 + 0.01)
      }

      case ShapeType.Ball: {
        const r = (collider.shape as Ball).radius
        return new SphereBufferGeometry(r + +0.01, 12, 12)
      }

      case ShapeType.TriMesh: {
        const v = (collider.shape as TriMesh).vertices
        const i = (collider.shape as TriMesh).indices

        const g = new BufferGeometry()
        // Vertices are not always a float3darray (???), so we need to convert them
        const safeVerts = Float32Array.from(v)
        g.setAttribute('position', new BufferAttribute(safeVerts, 3))
        g.index?.set(i)
        g.setDrawRange(0, g.attributes.position.array.length / 3 - 1)
        return g
      }

      case ShapeType.ConvexPolyhedron: {
        const cv = (collider.shape as ConvexPolyhedron).vertices
        // Vertices are not always a float3darray (???), so we need to convert them
        const safeVerts = Float32Array.from(cv)
        const cg = new BufferGeometry()
        cg.setAttribute('position', new BufferAttribute(safeVerts, 3))
        return cg
      }

      case ShapeType.Cylinder: {
        const r = (collider.shape as Cylinder).radius
        const h = (collider.shape as Cylinder).halfHeight
        const g = new CylinderBufferGeometry(r, r, h)
        return g
      }
    }

    return new BoxBufferGeometry(1, 1, 1)
  }
</script>

<script lang="ts">
  import { Mesh, useFrame } from '@threlte/core'
  import { Quaternion } from 'three'
  import type { Mesh as ThreeMesh } from 'three'
  import { MeshBasicMaterial } from 'three'
  import type { Material } from 'three'
  import { useRapier } from '../../hooks/useRapier'

  export let colliderHandle: number
  export let material: Material | undefined = undefined

  let mesh: ThreeMesh | undefined = undefined

  const { world } = useRapier()

  const collider = world.getCollider(colliderHandle)
  const geometry = geometryFromCollider(collider)

  useFrame(() => {
    if (!mesh) return
    const collider = world.getCollider(colliderHandle)

    if (collider) {
      const { x: rx, y: ry, z: rz, w: rw } = collider.rotation()
      const { x, y, z } = collider.translation()

      mesh.position.set(x, y, z)
      mesh.rotation.setFromQuaternion(new Quaternion(rx, ry, rz, rw))
    }
  })
</script>

<Mesh
  {geometry}
  material={material ??
    new MeshBasicMaterial({
      color: 'green',
      wireframe: true
    })}
  bind:mesh
/>
