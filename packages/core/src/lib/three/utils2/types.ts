export type PropSetter = (value: any) => void

export type Attach<T> = string | ((parent: any, self: T) => (() => void) | void) | undefined
