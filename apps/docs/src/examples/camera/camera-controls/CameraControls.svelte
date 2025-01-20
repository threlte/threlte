<script lang="ts">
  import CameraControls from './CameraControls'
  import type CC from 'camera-controls'
  import type { Camera } from './types'
  import { useTask, useThrelte } from '@threlte/core'

  let { camera, ref = $bindable() }: { camera?: Camera; ref: CC | undefined } = $props()

  const { dom, invalidate } = useThrelte()

  ref = new CameraControls(dom)

  $effect(() => {
    if (camera !== undefined) {
      ref.camera = camera
    }
  })

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
