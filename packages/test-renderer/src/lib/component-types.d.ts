/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ComponentProps,
  Component as ModernComponent,
  mount,
} from 'svelte'

/** A compiled, imported Svelte component. */
export type Component<
  P extends Record<string, any> = any,
  E extends Record<string, any> = any,
> = ModernComponent<P, E>

/**
 * The type of an imported, compiled Svelte component.
 */
export type ComponentType<C> = C

/** The props of a component. */
export type Props<C extends Component> = ComponentProps<C>

/**
 * The exported fields of a component.
 *
 * The set of variables marked as `export`'d.
 */
export type Exports<C> = C extends ModernComponent<any, infer E> ? E : never

/**
 * Options that may be passed to `mount` when rendering the component.
 */
export type MountOptions<C extends Component> = Parameters<
  typeof mount<Props<C>, Exports<C>>
>[1]
