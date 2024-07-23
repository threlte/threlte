import type { OrthographicCamera, PerspectiveCamera } from 'three'

export const isOrthographicCamera = (value: object): value is OrthographicCamera => {
  return 'isOrthographicCamera' in value
}

export const isPerspectiveCamera = (value: object): value is PerspectiveCamera => {
  return 'isPerspectiveCamera' in value
}

export const isPerspectiveOrOrthographicCamera = (
  value: any
): value is PerspectiveCamera | OrthographicCamera => {
  return isPerspectiveCamera(value) || isOrthographicCamera(value)
}
