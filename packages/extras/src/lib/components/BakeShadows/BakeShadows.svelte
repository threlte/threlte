<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { fromStore } from 'svelte/store'
  import { useSuspense } from '../../suspense/useSuspense.js'

  type UpdatableShadow = {
    autoUpdate: boolean
    needsUpdate: boolean
  }

  const suspended = fromStore(useSuspense().suspended)

  const { renderer, scene } = useThrelte()

  const freeze = (shadow: UpdatableShadow) => {
    const { autoUpdate } = shadow

    shadow.autoUpdate = false
    shadow.needsUpdate = true

    return () => {
      shadow.autoUpdate = autoUpdate
      shadow.needsUpdate = true
    }
  }

  $effect(() => {
    if (suspended.current) {
      return
    }

    const restore: (() => void)[] = []

    // WebGL gates every shadow behind one renderer-wide flag that WebGPU has no
    // equivalent for. Both honor the per-light flags.
    const shadowMap = renderer.shadowMap as Partial<UpdatableShadow>

    if (shadowMap.autoUpdate !== undefined) {
      restore.push(freeze(shadowMap as UpdatableShadow))
    }

    scene.traverse((object) => {
      const { shadow } = object as { shadow?: UpdatableShadow }

      if (shadow !== undefined) {
        restore.push(freeze(shadow))
      }
    })

    return () => {
      for (const undo of restore) {
        undo()
      }
    }
  })
</script>
