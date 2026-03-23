import { isInstanceOf } from '@threlte/core'
import {
  Camera,
  Matrix4,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Raycaster,
  Vector2,
  Vector3
} from 'three'

const v1 = new Vector3()
const v2 = new Vector3()
const v3 = new Vector3()
const vec2 = new Vector2()

export const defaultCalculatePosition = (
  obj: Object3D,
  camera: Camera,
  size: { width: number; height: number }
): [number, number] => {
  const objectPos = v1.setFromMatrixPosition(obj.matrixWorld)
  objectPos.project(camera)
  const widthHalf = size.width / 2
  const heightHalf = size.height / 2
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf]
}

export const isObjectBehindCamera = (el: Object3D, camera: Camera) => {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
  const deltaCamObj = objectPos.sub(cameraPos)
  const camDir = camera.getWorldDirection(v3)
  return deltaCamObj.angleTo(camDir) > Math.PI / 2
}

export const isObjectVisible = (
  el: Object3D,
  camera: Camera,
  raycaster: Raycaster,
  occlude: Object3D[]
): boolean => {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld)
  const screenPos = v2.copy(v1)
  screenPos.project(camera)
  raycaster.setFromCamera(vec2.set(screenPos.x, screenPos.y), camera)
  const intersects = raycaster.intersectObjects(occlude, true)

  if (intersects.length) {
    const intersectionDistance = intersects[0].distance
    const pointDistance = elPos.distanceTo(raycaster.ray.origin)
    return pointDistance < intersectionDistance
  }

  return true
}

export const objectScale = (el: Object3D, camera: Camera) => {
  if (isInstanceOf(camera, 'OrthographicCamera')) {
    return camera.zoom
  } else if (isInstanceOf(camera, 'PerspectiveCamera')) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
    const vFOV = (camera.fov * Math.PI) / 180
    const dist = objectPos.distanceTo(cameraPos)
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist
    return 1 / scaleFOV
  } else {
    return 1
  }
}

export const objectZIndex = (
  el: Object3D,
  camera: OrthographicCamera | PerspectiveCamera,
  zIndexRange: Array<number>
): number | undefined => {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
  const dist = objectPos.distanceTo(cameraPos)
  const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near)
  const B = zIndexRange[1] - A * camera.far
  return Math.round(A * dist + B)
}

export const epsilon = (value: number) => (Math.abs(value) < 1e-10 ? 0 : value)

export const getCSSMatrix = (mat4: Matrix4, m: number[], prepend = '') => {
  const { elements: e } = mat4
  return `${prepend}matrix3d(
    ${epsilon(m[0] * e[0])},${epsilon(m[1] * e[1])},${epsilon(m[2] * e[2])},${epsilon(m[3] * e[3])},
    ${epsilon(m[4] * e[4])},${epsilon(m[5] * e[5])},${epsilon(m[6] * e[6])},${epsilon(m[7] * e[7])},
    ${epsilon(m[8] * e[8])},${epsilon(m[9] * e[9])},${epsilon(
      m[10] * e[10]
    )},${epsilon(m[11] * e[11])},
    ${epsilon(m[12] * e[12])},${epsilon(m[13] * e[13])},${epsilon(
      m[14] * e[14]
    )},${epsilon(m[15] * e[15])}
  )`
}

export const getCameraCSSMatrix = ((multipliers: number[]) => {
  return (matrix: Matrix4) => getCSSMatrix(matrix, multipliers)
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1])

export const getObjectCSSMatrix = ((scaleMultipliers: (n: number) => number[]) => {
  return (matrix: Matrix4, factor: number) =>
    getCSSMatrix(matrix, scaleMultipliers(factor), 'translate(-50%,-50%)')
})((f: number) => [
  1 / f,
  1 / f,
  1 / f,
  1,
  -1 / f,
  -1 / f,
  -1 / f,
  -1,
  1 / f,
  1 / f,
  1 / f,
  1,
  1,
  1,
  1,
  1
])

export const getViewportFactor = (
  camera: Camera,
  target: Vector3,
  size: {
    width: number
    height: number
  }
): number => {
  if (isInstanceOf(camera, 'OrthographicCamera')) {
    return 1
  }

  if (isInstanceOf(camera, 'PerspectiveCamera')) {
    const { width, height } = size
    const distance = camera.getWorldPosition(v1).distanceTo(target)

    // convert vertical fov to radians
    const fov = (camera.fov * Math.PI) / 180
    // visible height
    const h = 2 * Math.tan(fov / 2) * distance
    const w = h * (width / height)
    return width / w
  }

  throw new Error('getViewportFactor needs a Perspective or Orthographic Camera')
}
