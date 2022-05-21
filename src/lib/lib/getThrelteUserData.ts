import type { ThrelteUserData } from '../types/types'
import type { Object3D } from 'three'

export const getThrelteUserData = (object: Object3D): ThrelteUserData => {
  return object.userData as ThrelteUserData
}
