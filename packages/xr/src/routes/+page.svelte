<script lang='ts'>

import { onMount } from 'svelte'
import { base } from '$app/paths'
import * as THREE from 'three'

const demos = [
  ['Events', 'events'],
  ['Custom controller models', 'models'],
  ['Hands', 'hands'],
  ['Teleporting', 'teleport'],
  ['Immersive AR', 'ar'],
  ['BonkSaber', 'bonksaber'],
  ['Hand Physics', 'hand-physics'],
] as const

onMount(() => {
  window.THREE = THREE
})

</script>

<main class='p-4'>
  <h1 class='font-bold text-xl'>Demos</h1>
  {#each demos as [text, href] (href)}
    <a href='{base}/{href}' class='block hover:underline'>{text}</a>
  {/each}
</main>
