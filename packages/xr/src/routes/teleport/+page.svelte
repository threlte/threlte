<script lang='ts'>

import { Canvas } from '@threlte/core'
import { VRButton } from '$lib'
import Scene from './scene.svelte'

</script>

<Canvas useLegacyLights={false}>
  <Scene />
</Canvas>

<VRButton />
