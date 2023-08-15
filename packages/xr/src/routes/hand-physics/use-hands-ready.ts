import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { useThrelte } from '@threlte/core'

export const useHandsReady = () => {
  const { xr } = useThrelte().renderer

  let joint = xr.getHand(0).joints['index-finger-tip']

  const ready = writable(joint?.jointRadius !== undefined)

  const id = setInterval(() => {
    joint = xr.getHand(0).joints['index-finger-tip']
    if (joint?.jointRadius !== undefined) {
      ready.set(true)
      clearInterval(id)
    }
  }, 250)

  onDestroy(() => clearInterval(id))

  return ready
}