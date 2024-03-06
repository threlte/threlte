<script lang="ts">
  import { gameState } from '../state'
  import BallOut from './BallOut.svelte'
  import DynamicBall from './DynamicBall.svelte'
  import StaticBall from './StaticBall.svelte'

  const { state } = gameState
</script>

{#if $state === 'playing'}
  <DynamicBall />
{:else if $state === 'game-over'}
  <BallOut />
{:else}
  <StaticBall />
{/if}
