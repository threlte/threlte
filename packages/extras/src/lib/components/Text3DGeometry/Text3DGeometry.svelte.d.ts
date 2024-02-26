import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { BufferGeometry } from 'three'

import type {
  TextGeometryParameters,
  TextGeometry
} from 'three/examples/jsm/geometries/TextGeometry'
import type { Font } from 'three/examples/jsm/loaders/FontLoader'

export type Text3DProps = Props<BufferGeometry> &
  Omit<TextGeometryParameters, 'font'> & {
    /**
     * The loaded font or path to font file
     */
    font: Font | string
    /**
     * The text to display
     */
    text: string

    /**
     * Smooth shading
     * @default 0
     */
    smooth?: number
  }

export type Text3DEvents = Events<BufferGeometry> & {
  rendered: (mesh: TextGeometry) => void
}

export type Text3DSlots = Slots<BufferGeometry>

export default class Text3D extends SvelteComponent<Text3DProps, Text3DEvents, Text3DSlots> {}
