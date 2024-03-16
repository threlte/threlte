import { Mesh, ColorRepresentation, Side, Texture } from 'three'
import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type ImageProps = Props<Mesh> & {
  color?: ColorRepresentation
  segments?: number
  scale?: [number, number] | number
  zoom?: number
  radius?: number
  grayscale?: number
  toneMapped?: boolean
  transparent?: boolean
  opacity?: number
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
