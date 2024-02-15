<script lang="ts">
  import { T } from '@threlte/core'
  import { useHeadset } from '../hooks/useHeadset'
  import ScenePortal from './internal/ScenePortal.svelte'

  const headset = useHeadset()
</script>

<ScenePortal>
  <T is={headset}>
    <slot />
  </T>
</ScenePortal>
