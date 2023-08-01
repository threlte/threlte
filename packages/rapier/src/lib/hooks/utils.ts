import type { Euler, Vector3 } from 'three'

export const isVector3 = (v: any): v is Vector3 => {
  return v.isVector3
}

export const isEuler = (v: any): v is Euler => {
  return v.isEuler
}
