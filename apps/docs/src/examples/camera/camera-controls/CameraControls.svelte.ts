import CC from 'camera-controls'
import type { OrthographicCamera, PerspectiveCamera } from 'three'
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

export default class CameraControls {
  static installed = false
  controls: CC
  constructor(camera: OrthographicCamera | PerspectiveCamera, getElement: () => HTMLElement) {
    if (!CameraControls.installed) {
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
      CameraControls.installed = true
    }

    this.controls = new CC(camera)

    $effect(() => {
      this.controls.connect(getElement())
      return () => {
        this.controls.disconnect()
      }
    })
  }
}
