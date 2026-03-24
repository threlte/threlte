<script lang="ts">
  import { PauseIcon, PlayIcon } from './icons'
  interface Props {
    position: number
    playing: boolean
    play?: (opts?: {}) => Promise<boolean>
    pause?: (opts?: {}) => Promise<boolean>
    rate?: number
  }

  let { position = $bindable(), playing, play, pause, rate = $bindable(1) }: Props = $props()

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const toggleRate = () => {
    if (rate == 1) {
      rate = 0.5
    } else if (rate == 0.5) {
      rate = 2
    } else {
      rate = 1
    }
  }
</script>

<menu>
  {#if !playing}
    <button onclick={() => play?.()}>
      <PlayIcon />
    </button>
  {:else}
    <button onclick={() => pause?.()}>
      <PauseIcon />
    </button>
  {/if}
  <button onclick={() => toggleRate()}>
    x{rate.toFixed(1)}
  </button>
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
