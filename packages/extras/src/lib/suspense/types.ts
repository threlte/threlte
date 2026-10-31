import type { Snippet } from 'svelte'

export interface SuspenseProps {
  /**
   * Once everything has loaded, keeps the children shown even if a child
   * suspends again later.
   * @default false
   */
  final?: boolean

  /**
   * The suspended content. It's always rendered so its resources can load,
   * but kept out of the scene while anything inside is suspended or has
   * failed.
   */
  children?: Snippet<[{ suspended: boolean; errors: Error[] }]>

  /** Rendered instead of the children when a child fails to load. */
  error?: Snippet<[{ errors: Error[] }]>

  /** Rendered while a child is suspended. */
  fallback?: Snippet

  /** Called when everything inside has finished loading. */
  onload?: () => void

  /** Called when a child fails to load, with every error so far. */
  onerror?: (error: Error[]) => void

  /** Called when a child suspends. */
  onsuspend?: () => void
}
