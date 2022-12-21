import { SvelteComponentTyped } from 'svelte'
import type { Props } from '@threlte/core'
import type { TextureEncoding } from 'three'
import type { GroundProjectedEnv } from 'three/examples/jsm/objects/GroundProjectedEnv'

export type EnvironmentProps = {
  /**
   * Defaults to "/"
   */
  path?: string
  /**
   * Provide a string to use an equirectangular envmap and a string array to use a cubic envmap
   */
  files: string | string[]
  /**
   * Boolean to toggle whether to use envmap as a scene background.
   */
  isBackground?: boolean
  /**
   * Props for ground projection. Scalar recommended to 100. Depending on envmap and project requirements, good starting point is radius: 200, height: 5.
   */
  groundProjection?: Props<GroundProjectedEnv>
  /**
   * Use `ldr` for .png, .jpg and `hdr` for .hdr file formats
   */
  format?: 'ldr' | 'hdr'
  /**
   * Envmap `TextureEncoding`. If not provided it defaults to `sRGBEncoding` for cubemap and `LinearEncoding` for equirectangular
   */
  encoding?: TextureEncoding
}

export default class Environment extends SvelteComponentTyped<EnvironmentProps> {}
