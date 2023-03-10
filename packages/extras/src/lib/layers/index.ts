import { setContext } from 'svelte'
import { writable } from 'svelte/store'
import { injectLayersPlugin } from './plugin'
import type { ThrelteLayers, ThrelteLayersContext } from './types'

type LayersOptions = {
  defaultLayers?: ThrelteLayers
}

/**
 * ### `layers`
 *
 * This plugin allows you to set the layers of an object.
 *
 * ```svelte
 * <T.Mesh layers={4}>
 * ```
 *
 * In contrast to the default `layers` prop that is available on all
 * `THREE.Object3D` instances, this plugin enables the inheritance of the
 * `layers` prop.
 *
 * ```svelte
 * <T.Group layers={4}>
 * 	<!-- This mesh will be on layer 4 -->
 * 	<T.Mesh />
 * </T.Group>
 * ```
 *
 *
 * @param options
 */
const layers = (options?: LayersOptions) => {
  const local = writable<ThrelteLayers>(options?.defaultLayers ?? 0)
  setContext<ThrelteLayersContext>('threlte-layers-context', local)

  injectLayersPlugin()
}

export { layers }
export type { ThrelteLayers, ThrelteLayersContext }
