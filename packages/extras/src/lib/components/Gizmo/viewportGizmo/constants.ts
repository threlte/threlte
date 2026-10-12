import { Vector3 } from 'three'

export const axisKeys = ['x', 'y', 'z', 'nx', 'ny', 'nz'] as const
export const positiveAxisKeys = ['x', 'y', 'z'] as const
export const axisKeysZUp = ['x', 'z', 'y', 'nx', 'nz', 'ny'] as const
export const axisKeysXUp = ['z', 'x', 'y', 'nz', 'nx', 'ny'] as const
export const faceAliases = ['right', 'top', 'front', 'left', 'bottom', 'back'] as const

export const spherePointDistance = 1.3
export const cameraDistance = 7
export const orthographicExtent = 1.8
export const perspectiveFov = 26
export const epsilon = 1e-6
export const turnRate = 2 * Math.PI
export const dragThreshold = 10

export const cornerPositions = [
  1, 1, 1, -1, 1, 1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1
].map((value) => value * 0.85)

export const edgePositions = [
  0, 1, 1, 0, -1, 1, 1, 0, 1, -1, 0, 1, 0, 1, -1, 0, -1, -1, 1, 0, -1, -1, 0, -1, 1, 1, 0, 1, -1, 0,
  -1, 1, 0, -1, -1, 0
].map((value) => value * 0.925)

export const yUp = new Vector3(0, 1, 0)
