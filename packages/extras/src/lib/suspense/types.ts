import type { Snippet } from 'svelte'

export interface SuspenseProps {
  final?: boolean

  children?: Snippet<[{ suspended: boolean; errors: Error[] }]>
  error?: Snippet<[{ errors: Error[] }]>
  fallback?: Snippet

  onload?: () => void
  onerror?: (error: Error[]) => void
  onsuspend?: () => void
}
