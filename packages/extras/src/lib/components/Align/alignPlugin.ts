import { injectPlugin, isInstanceOf } from '@threlte/core'
import { onMount, tick } from 'svelte'

export const injectAlignPlugin = (align: () => void) => {
  injectPlugin('align-plugin', ({ ref }) => {
    if (!isInstanceOf(ref, 'Object3D')) return

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
