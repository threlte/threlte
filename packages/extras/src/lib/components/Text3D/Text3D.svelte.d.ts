import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Mesh } from 'three'

import type { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/addons/loaders/FontLoader.js'

export type Text3DProps = Props<Mesh> &
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

export type Text3DEvents = Events<Mesh> & {
  rendered: (mesh: Mesh) => void
}

export type Text3DSlots = Slots<Mesh>

export default class Text3D extends SvelteComponent<Text3DProps, Text3DEvents, Text3DSlots> {}
