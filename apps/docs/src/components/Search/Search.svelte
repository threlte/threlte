<script lang="ts">
  import { searchActive } from './searchStore'
  const toggleSearch = () => {
    searchActive.set(!$searchActive)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      toggleSearch()
    }

    if (e.key === 'Escape') {
      searchActive.set(false)
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<button
  aria-label="Search"
  class="text-faded relative flex w-full min-w-[200px] max-w-[14rem] flex-row items-center justify-start gap-2 rounded-md bg-blue-900 px-3 py-2 hover:text-white hover:brightness-110 md:mx-6"
  on:click={toggleSearch}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#000000"
    class="fill-current"
    viewBox="0 0 256 256"
    ><path
      d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"
    /></svg
  >
  <p class="text-sm">Search</p>
</button>
