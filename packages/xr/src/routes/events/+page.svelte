<script lang='ts'>

import { Canvas } from '@threlte/core'
import { VRButton } from '$lib'
import Scene from './scene.svelte'

</script>

<Canvas>
  <Scene />
</Canvas>

<VRButton
  on:click={(event) => console.log('vr button click', event)}
  on:error={(event) => console.log('vr button error', event)}
/>
