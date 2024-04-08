<script lang="ts">
  import type { Camera } from 'three'
  import { useCamera } from './utils/useCamera'

  interface Props {
    object: Camera
    manual: boolean
    makeDefault: boolean
  }

  let { object, manual, makeDefault }: Props = $props()

  // Camera
  const camera = useCamera()
  $effect.pre(() => {
    camera.update(object, manual)
    camera.makeDefaultCamera(object, makeDefault)
  })
</script>
