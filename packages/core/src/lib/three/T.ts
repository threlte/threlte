import PreprocessFallbackComponent from './PreprocessFallback.svelte'
import type * as THREE from 'three'
import type { SvelteComponentTyped } from 'svelte'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Events, Props, Slots } from './types'

/**
 * T is an abstract component that is used in conjunction with the package
 * '@threlte/preprocess' to render any THREE module in threlte. This proxy is
 * used to display an error message if the preprocessor is not registered.
 */
export const T = new Proxy(PreprocessFallbackComponent, {
  get(target: any, prop: any) {
    return target[prop] || PreprocessFallbackComponent
  }
}) as unknown as {
  [Key in keyof typeof THREE]: typeof SvelteComponentTyped<
    Props<typeof THREE[Key]>,
    Events<typeof THREE[Key]>,
    Slots<typeof THREE[Key]>
  >
} & Record<string, typeof SvelteComponentTyped>
