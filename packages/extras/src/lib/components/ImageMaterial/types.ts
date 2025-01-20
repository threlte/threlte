import type { ShaderMaterial, ColorRepresentation, Side, Texture, VideoTexture } from 'three'
import type { Props } from '@threlte/core'

export type ImageMaterialProps = Props<ShaderMaterial> & {
  /**
   * @default 'white'
   */
  color?: ColorRepresentation

  /**
   * @default 1
   */
  segments?: number

  /**
   * @defaut 1
   */
  scale?: [number, number] | number

  /**
   * @default 1
   */
  zoom?: number

  /**
   * @default 0
   */
  radius?: number

  /**
   * @default 0
   */
  alphaThreshold?: number

  /**
   * @default 0.1
   */
  alphaSmoothing?: number

  /**
   * @default 0
   */
  brightness?: number

  /**
   * @default 0
   */
  contrast?: number

  /**
   * @default 0
   */
  hue?: number

  /**
   * @default 0
   */
  saturation?: number

  /**
   * @default 0
   */
  lightness?: number

  /**
   * @default '#535970'
   */
  monochromeColor?: string

  /**
   * @default 0
   */
  monochromeStrength?: number

  /**
   * @default false
   */
  negative?: boolean

  /**
   * Can be used to adjust the strength and the pattern of color processing
   *
   * Each channel of the texture is responsible for a different color processing function
   * (multiplicatively with the effect's value set via the other props)
   *
   * r - hue
   *
   * g - saturation
   *
   * b - lightness
   *
   * a - alpha override
   *
   * @default undefined
   */
  colorProcessingTexture?: Texture | VideoTexture | undefined

  /**
   * @default true
   */
  toneMapped?: boolean

  /**
   * @default false
   */
  transparent?: boolean

  /**
   * @default 1
   */
  opacity?: number

  /**
   * @default Three.FrontSide
   */
  side?: Side
} & (
    | {
        texture: Texture
        url?: never
      }
    | {
        texture?: never
        url: string
      }
  )
