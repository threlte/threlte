import { resolvePropertyPath } from '@threlte/core'
import type {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Material,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  RectAreaLight,
  SpotLight
} from 'three'

export const haveProperty = <T = any>(objects: any[], property: string): objects is T[] => {
  return objects.every((object) => property in object)
}

export const areOfType = <T = any>(objects: any[], isType: string): objects is T[] => {
  return objects.every((object) => isType in object)
}

export const readFromFirstObject = (objects: any[], propertyPath: string) => {
  const { target, key } = resolvePropertyPath(objects[0], propertyPath)
  return target[key]
}

export const areCamera = (
  objects: any[]
): objects is PerspectiveCamera[] | OrthographicCamera[] => {
  return (
    areOfType<PerspectiveCamera>(objects, 'isPerspectiveCamera') ||
    areOfType<OrthographicCamera>(objects, 'isOrthographicCamera')
  )
}

export const mutualType = (objects: any[]): `(${string})` | undefined => {
  const types = objects.map((object) => object.type) as string[]
  const uniqueTypes = new Set(types)
  if (uniqueTypes.size === 1 && types[0]) {
    return `(${types[0]})`
  }
  return undefined
}

export const areLight = (
  objects: any[]
): objects is (
  | AmbientLight
  | DirectionalLight
  | PointLight
  | SpotLight
  | HemisphereLight
  | RectAreaLight
)[] => {
  return (
    areOfType<DirectionalLight>(objects, 'isDirectionalLight') ||
    areOfType<PointLight>(objects, 'isPointLight') ||
    areOfType<SpotLight>(objects, 'isSpotLight') ||
    areOfType<HemisphereLight>(objects, 'isHemisphereLight') ||
    areOfType<RectAreaLight>(objects, 'isRectAreaLight') ||
    areOfType<AmbientLight>(objects, 'isAmbientLight')
  )
}

export const haveMaterialProperty = (
  objects: any[]
): objects is (Object3D & { material: Material })[] => {
  return haveProperty<Object3D & { material: Material }>(objects, 'material')
}
