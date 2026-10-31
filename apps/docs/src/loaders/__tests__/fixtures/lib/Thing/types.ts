import type { Snippet } from 'svelte'
import type { ExternalBase } from '../../external.js'

export interface SharedOptions {
  /**
   * Inherited from a base in the package.
   * @default 2
   */
  shared?: number
}

export interface ThingBaseProps extends ExternalBase, SharedOptions {
  /** The thing's name. */
  name: string

  /**
   * How big the thing is.
   * @default 1
   */
  size?: number

  /** Falls back to the destructured default. */
  speed?: number

  /** A bound output. */
  value?: number

  /** Called when the thing changes. */
  onchange?: (event: { size: number }) => void

  /** @deprecated Use `size` instead. */
  scale?: number

  ref?: object
  children?: Snippet
}

export type ThingProps = ThingBaseProps &
  (
    | {
        /** The kind of thing. */
        kind?: 'box'
      }
    | {
        kind?: 'sphere'
        /** Only used by spheres. */
        radius?: number
      }
  )
