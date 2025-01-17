import CC from 'camera-controls'
import type { OrthographicCamera } from 'three'
import { PerspectiveCamera } from 'three'
import {
  Box3,
  Matrix4,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4
} from 'three'

export default class CameraControls extends CC {
  static #installed = false
  constructor(
    element: HTMLElement,
    camera: OrthographicCamera | PerspectiveCamera = new PerspectiveCamera()
  ) {
    if (!CameraControls.#installed) {
      CC.install({
        THREE: {
          Box3,
          Matrix4,
          Quaternion,
          Raycaster,
          Sphere,
          Spherical,
          Vector2,
          Vector3,
          Vector4
        }
      })
      CameraControls.#installed = true
    }

    super(camera, element)
  }
}
