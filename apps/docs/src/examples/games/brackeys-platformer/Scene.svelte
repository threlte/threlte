<script lang="ts">
  import { interactivity } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import Intro from './scenes/Intro.svelte'
  import { game } from './Game.svelte'

  interactivity()
</script>

{#if game.debug}
  <Debug />
{/if}

<Intro />
