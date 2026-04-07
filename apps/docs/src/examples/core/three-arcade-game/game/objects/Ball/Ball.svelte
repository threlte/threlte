<script lang="ts">
  import { game } from '../../Game.svelte'
  import BallOut from './BallOut.svelte'
  import DynamicBall from './DynamicBall.svelte'
  import StaticBall from './StaticBall.svelte'
</script>

{#if game.state === 'playing'}
  <DynamicBall startAtPosX={game.playerPosition} />
{:else if game.state === 'game-over'}
  <BallOut />
{:else}
  <StaticBall />
{/if}
