<script lang='ts'>

import { Canvas } from '@threlte/core'
import { VRButton } from '$lib'
import { World, Debug } from '@threlte/rapier'
import Scene from './scene.svelte'
import CodeLink from '../components/code-link.svelte'

</script>

<Canvas>
  <World gravity={[0, 0, 0]}>
    {#if localStorage.getItem('debug')}
      <Debug />
    {/if}
    <Scene />
  </World>
</Canvas>

<CodeLink href='https://github.com/michealparks/threlte-xr/tree/main/src/routes/bonksaber' />

<VRButton />
