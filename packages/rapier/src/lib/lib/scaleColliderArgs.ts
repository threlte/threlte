import type { ColliderDesc } from '@dimforge/rapier3d-compat'
import type { Vector3 } from 'three'
import type { ColliderShapes } from '../types/types'

export const scaleVertices = (vertices: ArrayLike<number>, scale: Vector3): number[] => {
  const scaledVerts = Array.from(vertices)

  for (let i = 0; i < vertices.length / 3; i++) {
    scaledVerts[i * 3] *= scale.x
    scaledVerts[i * 3 + 1] *= scale.y
    scaledVerts[i * 3 + 2] *= scale.z
  }

  return scaledVerts
}

export const scaleColliderArgs = <Shape extends ColliderShapes>(
  shape: Shape,
  args: Parameters<typeof ColliderDesc[Shape]>,
  scale: Vector3
): Parameters<typeof ColliderDesc[Shape]> => {
  // Heightfield only scales the last arg
  const newArgs = args.slice()
  if (shape === 'heightfield') {
    // Is this for auto scaling heightfield to THREE scale of the object?
    // ;(newArgs[3] as number) = scale.x
    return newArgs as Parameters<typeof ColliderDesc[Shape]>
  }

  // Trimesh and convex scale the vertices
  if (shape === 'trimesh' || shape === 'convexHull') {
    newArgs[0] = new Float32Array(scaleVertices(newArgs[0] as ArrayLike<number>, scale))
    return newArgs as Parameters<typeof ColliderDesc[Shape]>
  }

  const scaleArray = [scale.x, scale.y, scale.z]
  return newArgs.map((arg, index) => (scaleArray[index] ?? 1) * (arg as number)) as Parameters<
    typeof ColliderDesc[Shape]
  >
}
