import { setContext } from 'svelte'
import { injectLayersPlugin } from './plugin.svelte.js'
import type { ThrelteLayers, ThrelteLayersContext } from './types.js'

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
  setContext<ThrelteLayersContext>('threlte-layers-context', {
    layers: options?.defaultLayers ?? 0
  })

  injectLayersPlugin()
}

export { layers }
export type { ThrelteLayers, ThrelteLayersContext }
