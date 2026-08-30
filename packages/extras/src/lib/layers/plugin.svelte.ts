import { injectPlugin, isInstanceOf, observe } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'
import type { ThrelteLayers, ThrelteLayersContext } from './types.js'

export const injectLayersPlugin = () => {
  injectPlugin<{ layers?: ThrelteLayers }>('layers', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D')) return

    const ctx = getContext<ThrelteLayersContext>('threlte-layers-context')
    const mergedLayers = $derived(args.props.layers ?? ctx?.layers)

    setContext<ThrelteLayersContext>('threlte-layers-context', {
      get layers() {
        return mergedLayers as ThrelteLayers
      }
    })

    const applyLayers = (ref: Object3D, layers?: ThrelteLayers) => {
      if (layers === 'all') {
        ref.layers.enableAll()
      } else if (layers === 'none') {
        ref.layers.disableAll()
      } else if (Array.isArray(layers)) {
        for (let index = 0; index < 32; index += 1) {
          const layerIndex = index as (typeof layers)[number]
          const enabled = layers.includes(layerIndex)
          if (enabled) {
            ref.layers.enable(index)
          } else {
            ref.layers.disable(index)
          }
        }
      } else if (layers !== undefined) {
        ref.layers.set(layers)
      }
    }

    observe.pre(
      () => [args.ref, mergedLayers],
      ([ref, layers]) => {
        if (!isInstanceOf(ref, 'Object3D')) return
        applyLayers(ref, layers)
      }
    )

    return {
      pluginProps: ['layers']
    }
  })
}
