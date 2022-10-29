import type { Instance, InstanceData } from './types'

export const prepareInstance = (baseInstance: any, type: string): Instance => {
  const data: InstanceData = {
    isMaterial: type.endsWith('Material'),
    isGeometry: type.endsWith('Geometry'),
    isCamera: type.endsWith('Camera'),
    type,
    previousAttach: {},
    memoizedPropSetters: {}
  }
  baseInstance['_threlte_three'] = data
  return baseInstance
}
