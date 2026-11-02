import type { Snippet } from 'svelte'

export interface PortalProps {
  /**
   * The `id` of the `<PortalTarget>` to render the children into.
   * @default 'default'
   */
  id?: string

  /** @deprecated Removed. Use `attach` on the children instead. */
  object?: never

  /** The content to render at the `<PortalTarget>`. */
  children?: Snippet
}

export interface PortalTargetProps {
  /**
   * Identifies this target, so `<Portal>` components with the same `id`
   * render their children here.
   * @default 'default'
   */
  id?: string
}
