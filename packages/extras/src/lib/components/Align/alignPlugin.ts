import { injectPlugin } from '@threlte/core'
import { onMount, tick } from 'svelte'
import type { Object3D } from 'three'

const isObject3D = (object: any): object is Object3D => object.isObject3D

export const injectAlignPlugin = (align: () => void) => {
  injectPlugin('align-plugin', ({ ref }) => {
    if (!isObject3D(ref)) return

    onMount(() => {
      align()
      return align
    })

    const waitForTickAndAlign = async () => {
      await tick()
      align()
    }

    return {
      onRefChange() {
        waitForTickAndAlign()
      }
    }
  })
}
