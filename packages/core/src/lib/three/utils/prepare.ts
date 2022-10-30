import type { Instance, InstanceData } from './types'

export const prepareInstance = (baseInstance: any, type: string, parent: any): Instance => {
  const data: InstanceData = {
    parent,
    isMaterial: type.endsWith('Material'),
    isGeometry: type.endsWith('Geometry'),
    isCamera: type.endsWith('Camera'),
    type,
    valueBeforeAttach: null,
    memoizedPropSetters: {}
  }
  baseInstance['_threlte_three'] = data
  return baseInstance
}
