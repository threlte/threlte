<script lang="ts">
  import { AudioListener, interactivity } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import { AudioListener as ThreeAudioListener } from 'three'
  import ArcadeScene from './arcade/Scene.svelte'
  import GameScene from './game/Scene.svelte'
  import { game } from './game/Game.svelte'
  import { provideArcadeControls } from './game/controls.svelte'
  import CustomRendering from './Renderer.svelte'

  $effect(() => {
    const intervalHandler = setInterval(() => {
      game.blinkClock = game.blinkClock === 0 ? 1 : 0
    }, 96)
    return () => clearInterval(intervalHandler)
  })

  interactivity()
  provideArcadeControls()

  let listener = $state.raw<ThreeAudioListener>()

  $effect(() => {
    if (listener) game.sound.init(listener)
  })
</script>

<AudioListener
  bind:ref={listener}
  autoResume
  masterVolume={game.muted ? 0 : 1}
/>

{#if game.debug}
  <Debug />
{:else}
  <CustomRendering />
{/if}

<ArcadeScene />

<GameScene />
