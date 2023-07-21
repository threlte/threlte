<script lang='ts'>

import { Canvas } from '@threlte/core'
import { VRButton } from '$lib'

</script>

<Canvas
  useLegacyLights={false}
>
  <slot />
</Canvas>

<VRButton />
