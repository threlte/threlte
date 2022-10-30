export type Attach = string | ((parent: any, self: any) => (() => void) | void)

export type PropSetter = (value: any) => void

export type InstanceData = {
  parent?: any
  isCamera: boolean
  isGeometry: boolean
  isMaterial: boolean
  type: string
  valueBeforeAttach: null | any
  memoizedPropSetters: Record<
    string,
    {
      fn: PropSetter
      parent: any
      propertyKey: string
    }
  >
}

export type Instance = {
  _threlte_three: InstanceData
}
