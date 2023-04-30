<script lang="ts">
  export let position: number
  export let playing: boolean
  export let play: (opts?: {}) => Promise<boolean>
  export let pause: (opts?: {}) => Promise<boolean>

  import { PlayIcon, PauseIcon } from './icons'

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<menu>
  {#if !playing}
    <button on:click={() => play()}>
      <PlayIcon />
    </button>
  {:else}
    <button on:click={() => pause()}>
      <PauseIcon />
    </button>
  {/if}
  <input
    type="range"
    min={0}
    max={1}
    step={0.01}
    bind:value={position}
  />
  <div>{fmt(position)}</div>
</menu>

<style>
  menu {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    color: white;
    font-weight: bold;
  }

  menu :global(svg) {
    fill: white;
    width: 24px;
    height: 24px;
  }

  menu div {
    width: 50px;
    min-width: 50px;
  }

  menu input {
    flex-grow: 1;
  }
</style>
