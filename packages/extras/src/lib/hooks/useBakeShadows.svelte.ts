import { fromStore } from 'svelte/store'
import { useSuspense } from '@threlte/extras'
import { useThrelte } from '@threlte/core'

export const useBakeShadows = () => {
  const suspended = fromStore(useSuspense().suspended)

  const { renderer } = useThrelte()

  $effect(() => {
    if (suspended.current) return

    const { autoUpdate } = renderer.shadowMap

    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true

    return () => {
      renderer.shadowMap.autoUpdate = autoUpdate
      renderer.shadowMap.needsUpdate = true
    }
  })
}
