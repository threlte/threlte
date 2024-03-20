import { Mesh, ColorRepresentation, Side, Texture } from 'three'
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
  grayscale?: number
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
  /** Default: false */
  negative?: boolean
  /** Default: undefined */
  colorProcessingTexture?: Texture
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
