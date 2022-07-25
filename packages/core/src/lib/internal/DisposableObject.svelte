<script lang="ts" context="module">
  /**
   * Recursively disposes an object.
   * This function needs to be bulletproof.
   *
   * @param obj
   */
  const dispose = <Obj extends { dispose?: () => void; type?: string; [key: string]: any }>(
    obj?: Obj
  ) => {
    if (!obj) return
    if (obj?.dispose && typeof obj.dispose === 'function' && obj.type !== 'Scene') obj.dispose()
    // iterate over properties of obj
    Object.entries(obj).forEach(([propKey, propValue]) => {
      // we don't want to dispose the parent
      if (propKey === 'parent') return
      // dispose all children
      if (propKey === 'children' && Array.isArray(propValue)) {
        const children = propValue as Object3D[]
        children.forEach((child) => {
          dispose(child)
        })
      }
      const value = propValue as any
      if (value?.dispose) {
        dispose(value)
      }
    })
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { Object3D } from 'three'

  type Object = $$Generic<{ dispose?: () => void; type?: string; [key: string]: any } | undefined>

  export let object: Object

  onDestroy(() => {
    dispose(object)
  })
</script>
