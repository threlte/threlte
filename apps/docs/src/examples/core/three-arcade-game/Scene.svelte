<script lang="ts">
  import { interactivity } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import ArcadeScene from './arcade/Scene.svelte'
  import GameScene from './game/Scene.svelte'
  import { game } from './game/Game.svelte'
  import CustomRendering from './Renderer.svelte'

  $effect(() => {
    const intervalHandler = setInterval(() => {
      game.blinkClock = game.blinkClock === 0 ? 1 : 0
    }, 96)
    return () => clearInterval(intervalHandler)
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
