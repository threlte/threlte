import type { Object3D, OrthographicCamera, PerspectiveCamera } from 'three'
import type { Primitive } from 'type-fest'

export const isObject3D = (value: any): value is Object3D => {
  return value && value.isObject3D
}

export const isPrimitive = (value: any): value is Primitive => {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

export const isOrthographicOrPerspectiveCamera = (
  value: any
): value is OrthographicCamera | PerspectiveCamera => {
  return (value && value.isOrthographicCamera) || value.isPerspectiveCamera
}
