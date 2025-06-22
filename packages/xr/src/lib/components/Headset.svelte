<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { useHeadset } from '../hooks/useHeadset'

  const { scene } = useThrelte()
  const headset = useHeadset()
</script>

<T
  is={headset}
  attach={scene}
>
  <slot />
</T>
