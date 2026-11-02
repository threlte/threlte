import type { ShaderMaterial, ColorRepresentation, Side, Texture, VideoTexture } from 'three'
import type { Props } from '@threlte/core'

export interface ImageMaterialBaseProps extends Props<ShaderMaterial> {
  /**
   * Multiplies the image's colors.
   * @default 'white'
   */
  color?: ColorRepresentation

  /** @deprecated Has no effect. */
  segments?: number

  /** @deprecated Has no effect. Scale the parent mesh instead. */
  scale?: [number, number] | number

  /**
   * Zooms into the image around its center. The image always covers the
   * parent plane, like CSS `object-fit: cover`.
   * @default 1
   */
  zoom?: number

  /**
   * The corner radius of the image, in the parent plane's world units.
   * @default 0
   */
  radius?: number

  /**
   * Discards pixels whose `colorProcessingTexture` alpha is below
   * `1 - alphaThreshold`. Only applies with a `colorProcessingTexture`.
   * @default 0
   */
  alphaThreshold?: number

  /**
   * Softens the edge of `alphaThreshold`. Only applies with a
   * `colorProcessingTexture`.
   * @default 0.1
   */
  alphaSmoothing?: number

  /**
   * Adds to every color channel. Usually between `-1` and `1`.
   * @default 0
   */
  brightness?: number

  /**
   * Increases or decreases contrast. Usually between `-1` and `1`.
   * @default 0
   */
  contrast?: number

  /**
   * Shifts the hue, from `0` to `1` for a full turn around the color wheel.
   * @default 0
   */
  hue?: number

  /**
   * Increases or decreases saturation. Usually between `-1` and `1`.
   * @default 0
   */
  saturation?: number

  /**
   * Increases or decreases lightness. Usually between `-1` and `1`.
   * @default 0
   */
  lightness?: number

  /**
   * Converts the image to shades of this color. Leave it unset to keep the
   * image's colors.
   */
  monochromeColor?: string

  /**
   * How strongly the image is converted to `monochromeColor`, from `0` to
   * `1`.
   * @default 1 when monochromeColor is set
   */
  monochromeStrength?: number

  /**
   * Inverts the image's colors.
   * @default false
   */
  negative?: boolean

  /**
   * A texture that controls where and how strongly color processing applies.
   * Each channel scales one effect: red the `hue` shift, green `saturation`,
   * blue `lightness`, and alpha masks the image together with
   * `alphaThreshold` and `alphaSmoothing`.
   */
  colorProcessingTexture?: Texture | VideoTexture | undefined

  /**
   * Whether the renderer's tone mapping applies to the image.
   * @default true
   */
  toneMapped?: boolean

  /**
   * Whether the material is transparent. Required for `opacity` below `1` to
   * show.
   * @default false
   */
  transparent?: boolean

  /**
   * The opacity of the image. Only visible with `transparent` set.
   * @default 1
   */
  opacity?: number

  /**
   * Which side of the faces is rendered.
   * @default FrontSide
   */
  side?: Side
}

export type ImageMaterialProps = ImageMaterialBaseProps &
  (
    | {
        /** The image to display. Use either `texture` or `url`. */
        texture: Texture
        /** The URL of the image to load. Use either `texture` or `url`. */
        url?: never
      }
    | {
        /** The image to display. Use either `texture` or `url`. */
        texture?: never
        /** The URL of the image to load. Use either `texture` or `url`. */
        url: string
      }
  )
