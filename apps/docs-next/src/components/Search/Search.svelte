<script lang="ts">
  import Markprompt from './Markprompt.svelte'

  let searchActive = false

  // const glowClasses = {
  //   blue: '[background-image:radial-gradient(closest-side,rgba(123,175,224,0.12)_0%,transparent_100%)]'
  // }

  function toggleSearch() {
    searchActive = !searchActive
    isFocused = !isFocused
  }

  let isFocused = false

  console.log('mountin')

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      toggleSearch()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<button
  class="relative flex w-full max-w-[28rem] items-center hover:brightness-125"
  on:click={toggleSearch}
>
  <input
    class="w-full bg-blue-800/90 px-2 py-1 text-sm outline-none outline-blue-500 md:px-10"
    placeholder="Search docs"
    disabled
  />
  <div
    class={`absolute left-0 ml-2 flex gap-2 rounded-md px-1 py-1 duration-200 
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      class="hidden w-6 md:block"
      role="img"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>Search</title>
      <desc>A line styled icon from Orion Icon Library.</desc>
      <path
        data-name="layer2"
        fill="none"
        stroke="#ffffff"
        stroke-miterlimit="10"
        stroke-width="2"
        d="M39.049 39.049L56 56"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <circle
        data-name="layer1"
        cx="27"
        cy="27"
        r="17"
        fill="none"
        stroke="#ffffff"
        stroke-miterlimit="10"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  </div>
</button>

<div class="pointer-events-none absolute top-0 left-0 z-50 h-full w-full">
  {#if searchActive}
    <div
      class={`pointer-events-auto fixed top-0 left-0 h-screen  w-screen bg-gray-900/70
      `}
      on:click={toggleSearch}
      on:keypress={toggleSearch}
    />
  {/if}

  <dialog
    open={searchActive}
    class={`glow-blue pointer-events-auto mt-[10%] flex max-h-[60vh] w-full max-w-[800px] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white ${
      searchActive ? '' : 'hidden'
    }`}
  >
    <Markprompt focus={searchActive} />

    <!-- <div
      class={`absolute top-40 left-0 h-96 w-full -translate-y-full ${glowClasses['blue']} pointer-events-none`}
    /> -->
  </dialog>
</div>
