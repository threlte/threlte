import type { InteractiveObjectProperties, Object3DInstanceProperties } from '@threlte/core'

export type GLTFProperties = Omit<Object3DInstanceProperties, 'object'> & {
  url: string
  /** @deprecated Use `useDraco` instead*/
  dracoDecoderPath?: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string
} & Omit<InteractiveObjectProperties, 'object'>
