import { Mesh, ColorRepresentation, Side, Texture, VideoTexture } from 'three'
import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type ImageProps = Props<Mesh> & {
  /** Default: white */
  color?: ColorRepresentation
  /** Default: 1 */
  segments?: number
  /** Defaut: 1 */
  scale?: [number, number] | number
  /** Default: 1 */
  zoom?: number
  /** Default: 0 */
  radius?: number
  /** Default: 0 */
  alphaProgress?: number
  /** Default: 0.1 */
  alphaSmoothing?: number
  /** Default: 0 */
  brightness?: number
  /** Default: 0 */
  contrast?: number
  /** Default: 0 */
  hue?: number
  /** Default: 0 */
  saturation?: number
  /** Default: 0 */
  lightness?: number
  /** Default: #535970 */
  monochromeColor?: string
  /** Default: 0 */
  monochromeStrength?: number
  /** Default: false */
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
   * Default: undefined
   * */
  colorProcessingTexture?: Texture | VideoTexture
  /** Default: true */
  toneMapped?: boolean
  /** Default: false */
  transparent?: boolean
  /** Default: 1 */
  opacity?: number
  /** Default: FrontSide */
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

export type ImageEvents = Events<Mesh>

export type ImageSlots = Slots<Mesh>

export default class Image extends SvelteComponent<ImageProps, ImageEvents, ImageSlots> {}
