<script lang="ts">
  import type { OrthographicCamera, PerspectiveCamera } from 'three'
  import { useCamera } from './utils/useCamera.svelte.js'

  interface Props {
    ref: PerspectiveCamera | OrthographicCamera
    manual: boolean | undefined
    makeDefault: boolean | undefined
  }

  let { ref, manual = false, makeDefault = false, ...rest }: Props = $props()

  useCamera(
    () => ref,
    () => manual,
    () => makeDefault,
    () => rest
  )
</script>
