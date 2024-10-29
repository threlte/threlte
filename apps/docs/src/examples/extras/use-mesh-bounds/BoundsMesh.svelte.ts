import type { Vector3Tuple } from 'three'

export class BoundsMesh {
  wireframe = $state(true)
  constructor(readonly position: Vector3Tuple) {}
}
