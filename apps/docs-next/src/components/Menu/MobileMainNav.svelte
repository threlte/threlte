<script lang="ts">
  import { useElementMounted } from '$hooks/useElementMounted'
  import { c } from '$lib/classes'
  import { fade } from 'svelte/transition'
  import { customSlide } from './customSlide'

  let showMenu = false

  const { action, mounted } = useElementMounted()
</script>

<div class="fixed top-0 left-0 z-10 flex w-full flex-col md:hidden">
  <header
    class={c(
      'flex h-[70px] w-full flex-row items-center justify-between bg-[#0D1421] px-6 py-2 border-b',
      $mounted ? 'border-b-transparent' : 'border-b-orange/25'
    )}
  >
    <slot name="logo" />
    <button on:click={() => (showMenu = !showMenu)}>
      {#if showMenu}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
          />
          <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
          />
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          />
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
          />
        </svg>
      {/if}
    </button>
  </header>
  {#if showMenu}
    <div
      use:action
      out:customSlide={{
        delay: 200,
        duration: 200
      }}
      in:customSlide={{ duration: 200 }}
      class="border-b-orange/25 w-full border-b bg-[#0D1421] -z-10"
    >
      <div
        class="flex flex-col justify-center items-end pt-0 pb-6 px-6"
        in:fade={{ delay: 200, duration: 200 }}
        out:fade={{ duration: 200 }}
      >
        <a href="/docs/learn/getting-started"> Docs </a>
        <a href="/showcase"> Showcase </a>
        <div class="mt-4">
          <slot name="after" />
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Mobile nav spacer -->
<div class="h-[70px]" />
