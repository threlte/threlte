import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import { LumaSplatsSemantics, LumaSplatsThree, type LumaSplatsSource } from '@lumaai/luma-web'

export type LumaSplatsThreeProps = Props<LumaSplatsThree> & {
  source: LumaSplatsSource
  mode?: 'object' | 'env' | 'object-env'
  loadingAnimationEnabled?: boolean
  particleRevealEnabled?: boolean
  enableThreeShaderIntegration?: boolean
}

export type LumaSplatsThreeEvents = Events<LumaSplatsThree>

export type LumaSplatsThreeSlots = Slots<LumaSplatsThree>

export default class LumaSplatsThree extends SvelteComponent<
  LumaSplatsThreeProps,
  LumaSplatsThreeEvents,
  LumaSplatsThreeSlots
> {}
