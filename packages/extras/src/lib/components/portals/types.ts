import type { Snippet } from 'svelte'

export interface PortalProps {
  id?: string
  object?: never
  children?: Snippet
}

export interface PortalTargetProps {
  id?: string
}
