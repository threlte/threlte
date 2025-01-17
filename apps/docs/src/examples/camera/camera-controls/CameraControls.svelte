<script lang="ts">
  import CameraControls from './CameraControls'
  import type CC from 'camera-controls'
  import { T, useTask, useThrelte } from '@threlte/core'

  let { ref = $bindable() }: { ref: CC } = $props()

  const { dom, invalidate } = useThrelte()

  ref = new CameraControls(dom)

  useTask(
    (delta) => {
      if (ref.update(delta)) {
        invalidate()
      }
    },
    { autoInvalidate: false }
  )

  // dispose on unmount
  $effect(() => {
    return () => {
      ref.dispose()
    }
  })
</script>

<T
  is={ref.camera}
  makeDefault
/>
