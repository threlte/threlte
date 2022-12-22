import type {
  GroupProperties,
  InteractiveObjectProperties,
  Object3DInstanceProperties
} from '@threlte/core'

export type FloatProperties = GroupProperties & {
  speed: number
  rotationIntensity: number
  floatIntensity: number
  floatingRange: [number, number]
}

export type GLTFProperties = Omit<Object3DInstanceProperties, 'object'> & {
  url: string
  /** @deprecated Use `useDraco` instead*/
  dracoDecoderPath?: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string
} & Omit<InteractiveObjectProperties, 'object'>
