<script lang="ts">
  import { searchActive } from './searchStore'
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      if (!$searchActive) searchActive.set(true)
    }

    if (e.key === '/' && !$searchActive) {
      if (!$searchActive) searchActive.set(true)
    }

    if (e.key === 'Escape') {
      searchActive.set(false)
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<button
  aria-label="Search"
  class="text-faded relative flex w-full min-w-[50px] max-w-56 flex-row items-center justify-start gap-2 rounded-md border border-blue-500/10 bg-blue-900 px-3 py-2 hover:text-white hover:brightness-110 md:max-w-none"
  on:click={() => {
    searchActive.set(true)
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#000000"
    class="hidden fill-current lg:block"
    viewBox="0 0 256 256"
    ><path
      d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"
    /></svg
  >
  <p class="text-sm">Search</p>
</button>
