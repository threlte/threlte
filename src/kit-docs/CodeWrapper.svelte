<script lang="ts">
  import { slide } from 'svelte/transition'

  let expanded = false
</script>

<div class="w-full flex flex-row justify-end px-4 -mt-[4.5rem] pb-8 z-10">
  <button
    class="text-sm rounded-md shadow-lg border border-gray-divider px-4 bg-gray-body hover:bg-gray-hover"
    on:click={() => (expanded = !expanded)}
  >
    {expanded ? 'Hide Code' : 'Show Code'}
  </button>
</div>
{#if expanded}
  <div transition:slide|local>
    <slot />
  </div>
{/if}
