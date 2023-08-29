import { injectPlugin } from '@threlte/core'
import { onMount, tick } from 'svelte'
import type { Object3D } from 'three'

const isObject3D = (object: any): object is Object3D => object.isObject3D

export const injectCenterPlugin = (center: () => void) => {
  injectPlugin('center-plugin', ({ ref }) => {
    if (!isObject3D(ref)) return

    onMount(() => {
      center()
      return center
    })

    const waitForTickAndCenter = async () => {
      await tick()
      center()
    }

    return {
      onRefChange() {
        waitForTickAndCenter()
      }
    }
  })
}
