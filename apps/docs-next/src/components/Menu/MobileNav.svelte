<script lang="ts">
  import { useElementMounted } from '$hooks/useElementMounted'
  import { c } from '$lib/classes'
  import { fade } from 'svelte/transition'
  import { customSlide } from './customSlide'
  import BurgerIcon from './BurgerIcon.svelte'

  let showMenu = false

  const { action, mounted } = useElementMounted()
</script>

<div class="fixed top-0 left-0 z-50 flex w-full flex-col md:hidden max-h-screen">
  <header
    class={c(
      'flex h-[70px] w-full flex-row items-center justify-between bg-[#0D1421] px-6 py-2 border-b flex-shrink-0',
      $mounted ? 'border-b-transparent' : 'border-b-orange/25'
    )}
  >
    <div>
      <slot name="topbar-left" />
    </div>
    <div class="flex flex-row justify-end items-center gap-4">
      <div>
        <slot name="topbar-right" />
      </div>
      <BurgerIcon bind:showMenu />
    </div>
  </header>
  {#if showMenu}
    <div
      use:action
      out:customSlide={{
        delay: 200,
        duration: 200
      }}
      in:customSlide={{ duration: 200 }}
      class="border-b-orange/25 w-full border-b bg-[#0D1421] -z-10 min-h-0 overflow-auto"
    >
      <div
        class="pt-2 pb-6 px-6"
        in:fade={{ delay: 200, duration: 200 }}
        out:fade={{ duration: 200 }}
      >
        <slot name="content" />
      </div>
    </div>
  {/if}
</div>

<!-- Mobile nav spacer -->
<div class="h-[70px]" />
