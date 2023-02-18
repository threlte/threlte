<script lang="ts">
  import { c } from '$lib/classes'

  import { slide } from 'svelte/transition'

  let showMenu = false
  let showBorder = false
</script>

<div class="fixed top-0 left-0 z-10 flex w-full flex-col">
  <header
    class={c(
      'flex h-[70px] w-full flex-row items-center justify-between bg-[#0D1421] px-6 py-2',
      !showMenu && 'border-b-orange/25 border-b'
    )}
  >
    <slot name="logo" />
    <button on:click={() => (showMenu = !showMenu)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        width="24"
        height="24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </header>
  {#if showMenu}
    <div
      transition:slide
      class="border-b-orange/25 h-[100px] w-full border-b bg-[#0D1421]"
    />
  {/if}
</div>

<!-- Mobile nav spacer -->
<div class="h-[70px]" />
