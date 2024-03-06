<script lang="ts">
  import { interactivity } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import { onDestroy } from 'svelte'
  import ArcadeMachineScene from './ArcadeMachineScene.svelte'
  import GameScene from './game/GameScene.svelte'
  import { blinkClock, gameState } from './game/state'
  import MainScenePostProcessing from './MainScenePostProcessing.svelte'

  const { debug } = gameState
  const intervalHandler = setInterval(() => {
    blinkClock.update((c) => (c === 0 ? 1 : 0))
  }, 96)
  onDestroy(() => {
    clearInterval(intervalHandler)
  })

  interactivity()
</script>

{#if $debug}
  <Debug />
{:else}
  <MainScenePostProcessing />
{/if}

<ArcadeMachineScene />

<GameScene />
