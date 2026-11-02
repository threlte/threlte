import type { Snippet } from 'svelte'
import type { ExternalBase } from '../../external.js'

export type HoverHandler = (distance: number) => void

export type Listener<TData> = (event: TData & { type: string }) => void

export interface SharedOptions {
  /**
   * Inherited from a base in the package.
   * @default 2
   */
  shared?: number
}

export interface Holder<T> {
  /** The held item. */
  item?: T | null
}

export interface LocalMaterialOptions {
  /** The package-local opacity. */
  opacity?: number
}

export interface ThingBaseProps
  extends ExternalBase, SharedOptions, Holder<number>, LocalMaterialOptions {
  /** The thing's name. */
  name: string

  /**
   * How big the thing is.
   * @default 1
   */
  size?: number

  /** Falls back to the destructured default. */
  speed?: number

  /** Defaults to an arrow function. */
  shape?: (progress: number) => number

  /** Defaults to a URL. */
  url?: string

  /** A bound output. */
  value?: number

  /**
   * Any object with an `enabled` property works. Built-in @threlte/extras
   * controls are handled automatically.
   */
  controls?: { enabled: boolean }

  /**
   * Built-in
   * @threlte/extras components are handled.
   */
  wrapped?: string

  /** Layout options. */
  options?: {
    /** Horizontal gap. */
    gap: number
    align: 'start' | 'end'
  }

  /** Not supported. */
  material?: never

  /** Called when the thing changes. */
  onchange?: (event: { size: number }) => void

  /** Called when an item is picked. */
  onpick?: (index: number, label: string) => void

  /** Called when the thing is cleared. */
  onclear?: (() => void) | undefined

  /** Called with the selection, or `null` when nothing is selected. */
  onselect?: undefined | ((item: string | null) => void)

  /** Called with every added item. */
  onadd?: (...items: string[]) => void

  /** Called while hovering, when `distance > 0`. */
  onhover?: HoverHandler

  /** Called while moving. */
  onmove?: Listener<{ x: number }>

  /** Resizes automatically, or calls back to resize yourself. */
  onresize?: boolean | (() => void)

  /** @deprecated Use `size` instead. */
  scale?: number

  /** The underlying element. */
  ref?: HTMLButtonElement
  children?: Snippet
}

export type ThingProps = ThingBaseProps &
  (
    | {
        /** The kind of thing. */
        kind?: 'box'
      }
    | {
        /** The kind of thing. Spheres can set `radius`. */
        kind?: 'sphere'
        /** Only used by spheres. */
        radius?: number
      }
  )
