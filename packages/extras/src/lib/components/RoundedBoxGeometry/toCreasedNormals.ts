import { Vector3, BufferGeometry } from 'three'

const multiplier = (1 + 1e-10) * 1e2
const hashVertex = (v: Vector3) => {
  return `${~~(v.x * multiplier)},${~~(v.y * multiplier)},${~~(v.z * multiplier)}`
}

/**
 * Creates a new, non-indexed geometry with smooth normals everywhere except faces that meet at
 * an angle greater than the crease angle.
 *
 * Adapted from https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js but removed unnecessary steps and warnings.
 */
export const toCreasedNormals = (
  geometry: BufferGeometry,
  creaseAngle = Math.PI
): BufferGeometry => {
  const creaseDot = Math.cos(creaseAngle)
  const verts = [new Vector3(), new Vector3(), new Vector3()] as const
  const tempVec1 = new Vector3()
  const tempVec2 = new Vector3()
  const tempNorm = new Vector3()
  const tempNorm2 = new Vector3()

  const posAttr = geometry.getAttribute('position')
  const normAttr = geometry.getAttribute('normal')
  const vertexMap: Record<string, Vector3[]> = {}

  // find all the normals shared by commonly located vertices
  for (let i = 0, l = posAttr.count / 3; i < l; i += 1) {
    const i3 = 3 * i
    verts.forEach((vert, n) => vert.fromBufferAttribute(posAttr, i3 + n))
    tempVec1.subVectors(verts[2], verts[1])
    tempVec2.subVectors(verts[0], verts[1])

    // add the normal to the map for all vertices
    const normal = new Vector3().crossVectors(tempVec1, tempVec2).normalize()

    verts.forEach((vert) => {
      const hash = hashVertex(vert)
      if (!vertexMap[hash]) {
        vertexMap[hash] = []
      }
      vertexMap[hash]?.push(normal)
    })
  }

  // average normals from all vertices that share a common location if they are within the
  // provided crease threshold
  for (let i = 0, l = posAttr.count / 3; i < l; i += 1) {
    // get the face normal for this vertex
    const i3 = 3 * i
    verts.forEach((vert, n) => vert.fromBufferAttribute(posAttr, i3 + n))
    tempVec1.subVectors(verts[2], verts[1])
    tempVec2.subVectors(verts[0], verts[1])

    tempNorm.crossVectors(tempVec1, tempVec2).normalize()

    // average all normals that meet the threshold and set the normal value
    verts.forEach((vert, n) => {
      const hash = hashVertex(vert)
      tempNorm2.set(0, 0, 0)

      vertexMap[hash]?.forEach((otherNorm) => {
        if (tempNorm.dot(otherNorm) > creaseDot) {
          tempNorm2.add(otherNorm)
        }
      })

      tempNorm2.normalize()
      normAttr.setXYZ(i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z)
    })
  }

  geometry.setAttribute('normal', normAttr)
  return geometry
}
