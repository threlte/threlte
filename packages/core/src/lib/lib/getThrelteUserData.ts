import type { Object3D } from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type ThrelteUserData = {
  orbitControls?: OrbitControls
  onTransform?: () => Promise<void>
  threlteDefaultCamera?: boolean
}

export const getThrelteUserData = (object: Object3D): ThrelteUserData => {
  return object.userData as ThrelteUserData
}
