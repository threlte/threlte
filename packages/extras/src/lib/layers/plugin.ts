import { injectPlugin, isInstanceOf, watch } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import { derived, writable } from 'svelte/store'
import type { Object3D } from 'three'
import type { ThrelteLayers, ThrelteLayersContext } from './types'

const propIsThrelteLayers = (prop: unknown): prop is ThrelteLayers => {
  return (
    prop === 'all' ||
    prop === 'none' ||
    (Array.isArray(prop) && prop.every((v) => typeof v === 'number')) ||
    (typeof prop === 'number' && prop >= 0 && prop <= 31)
  )
}

export const injectLayersPlugin = () => {
  injectPlugin('layers', ({ ref, props }) => {
    if (!isInstanceOf(ref, 'Object3D')) return

    // because the value can be an inherited value or a prop value at any time, we need to store it in a store
    const local = writable<ThrelteLayers | undefined>(
      props.layers && propIsThrelteLayers(props.layers) ? props.layers : undefined
    )
    const ctx = getContext<ThrelteLayersContext>('threlte-layers-context')
    const merged = derived([local, ctx], ([prop, ctx]) => prop ?? ctx)

    setContext<ThrelteLayersContext>('threlte-layers-context', merged)

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

    // safe the ref in a store for easier access
    const refStore = writable<Object3D>(ref)

    watch([refStore, merged], ([ref, layers]) => {
      applyLayers(ref, layers)
    })

    return {
      onRestPropsChange(restProps) {
        local.set(
          restProps.layers && propIsThrelteLayers(restProps.layers) ? restProps.layers : undefined
        )
      },
      onRefChange(ref) {
        if (!isInstanceOf(ref, 'Object3D')) return
        refStore.set(ref)
      },
      pluginProps: ['layers']
    }
  })
}
