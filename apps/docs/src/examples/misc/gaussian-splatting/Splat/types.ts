import type { Snippet } from 'svelte'

export type SplatProps = {
  src: string
  alphaHash?: boolean
  alphaTest?: number | undefined
  toneMapped?: boolean | undefined
  children?: Snippet<[any]>
  [key: string]: any
}
