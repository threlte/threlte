<script lang="ts">
  import { interactivity } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import { onDestroy } from 'svelte'
  import ArcadeScene from './arcade/Scene.svelte'
  import GameScene from './game/Scene.svelte'
  import { game } from './game/Game.svelte'
  import CustomRendering from './Renderer.svelte'

  const intervalHandler = setInterval(() => {
    game.blinkClock = game.blinkClock === 0 ? 1 : 0
  }, 96)

  onDestroy(() => {
    clearInterval(intervalHandler)
  })

  interactivity()
</script>

{#if game.debug}
  <Debug />
{:else}
  <CustomRendering />
{/if}

<ArcadeScene />

<GameScene />
