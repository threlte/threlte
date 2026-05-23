import type { Snippet } from 'svelte'

export interface SuspenseProps {
  /** If final is set to true, components cannot re-suspend the suspended state. */
  final?: boolean

  children?: Snippet<[{ suspended: boolean; errors: Error[] }]>
  error?: Snippet<[{ errors: Error[] }]>
  fallback?: Snippet

  /** Fires when all child components wrapped in `suspend` have finished loading. */
  onload?: () => void
  /** Fires when an error is thrown in a child component wrapped in `suspend`. */
  onerror?: (error: Error[]) => void
  /** Fires when a child component suspends. */
  onsuspend?: () => void
}
