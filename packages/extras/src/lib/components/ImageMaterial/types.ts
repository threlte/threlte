import type { ShaderMaterial, ColorRepresentation, Side, Texture, VideoTexture } from 'three'
import type { Props } from '@threlte/core'

export type ImageMaterialProps = Props<ShaderMaterial> & {
  /** Creates a texture from the url. Takes priority over texture prop. */
  url?: string
  /** Uses the provided texture. Will be ignored if url is present. */
  texture?: Texture
  /**
   * @default 'white'
   */
  color?: ColorRepresentation

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

  /** Modifies brightness. Recommended range from -1 to 1.
   * @default 0
   */
  brightness?: number

  /** Modifies contrast. Recommended range from -1 to 1.
   * @default 0
   */
  contrast?: number

  /** Modifies hue. Range from 0 to 1.
   * @default 0
   */
  hue?: number

  /** Modifies saturation. Recommended range from -1 to 1.
   * @default 0
   */
  saturation?: number

  /** Modifies lightness. Recommended range from -1 to 1.
   * @default 0
   */
  lightness?: number

  /** Sets a monochrome tint the image is converted to.
   * @default '#535970'
   */
  monochromeColor?: string

  /** Sets the strength of monochrome effect. Range from 0 to 1.
   * @default 0
   */
  monochromeStrength?: number

  /** Enables/disables negative effect.
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
   * @default FrontSide
   */
  side?: Side
}
