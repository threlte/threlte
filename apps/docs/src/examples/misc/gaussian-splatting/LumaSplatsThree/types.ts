import type { Snippet } from 'svelte'
import type { LumaSplatsThree, LumaSplatsSource } from '@lumaai/luma-web'

export type LumaSplatsThreeProps = LumaSplatsThree & {
  source: LumaSplatsSource
  mode?: 'object' | 'object-env' | 'env'
  loadingAnimationEnabled?: boolean
  particleRevealEnabled?: boolean
  enableThreeShaderIntegration?: boolean
  children?: Snippet<[any]>
  [key: string]: any
}
