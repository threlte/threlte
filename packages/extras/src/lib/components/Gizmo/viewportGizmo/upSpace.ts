import { Quaternion, Vector3 } from 'three'

const yUp = new Vector3(0, 1, 0)
const normalized = new Vector3()
const rotation = new Quaternion()
const inverse = new Quaternion()

const alignToYUp = (up: Vector3) => {
  return rotation.setFromUnitVectors(normalized.copy(up).normalize(), yUp)
}

/**
 * Rotates `target` from world space into the Y-up space `Spherical` assumes.
 * Mutates and returns `target`.
 */
export const toYUpSpace = (target: Vector3, up: Vector3) => {
  return target.applyQuaternion(alignToYUp(up))
}

/** Rotates `target` back out of Y-up space. Mutates and returns `target`. */
export const fromYUpSpace = (target: Vector3, up: Vector3) => {
  return target.applyQuaternion(inverse.copy(alignToYUp(up)).invert())
}

/**
 * Reports which world axis an up vector points along, so axis labels and face
 * aliases can follow it. Falls back to the largest component rather than
 * demanding an exact match, which keeps negative and unnormalized vectors
 * working.
 */
export const dominantAxis = (up: Vector3) => {
  const x = Math.abs(up.x)
  const y = Math.abs(up.y)
  const z = Math.abs(up.z)

  return {
    isXUp: x > y && x >= z,
    isZUp: z > x && z > y
  }
}
