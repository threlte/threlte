<script lang='ts'>

import { Canvas } from '@threlte/core'
import { VRButton } from '$lib'
import { World, Debug } from '@threlte/rapier'
import Scene from './scene.svelte'

</script>

<Canvas>
  <World gravity={[0, 0, 0]}>
    {#if localStorage.getItem('debug-physics')}
      <Debug />
    {/if}
    <Scene />
  </World>
</Canvas>

<VRButton />
  