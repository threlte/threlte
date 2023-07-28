<script lang="ts">
  import { useElementMounted } from '$hooks/useElementMounted'
  import { c } from '$lib/classes'
  import { fade } from 'svelte/transition'
  import { customSlide } from './customSlide'
  import BurgerIcon from './BurgerIcon.svelte'

  let showMenu = false

  const { action, mounted } = useElementMounted()
</script>

<div class="fixed top-0 left-0 z-50 flex max-h-screen w-full flex-col md:hidden">
  <header
    class={c(
      'flex h-[70px] w-full flex-shrink-0 flex-row items-center justify-between border-b bg-[#0D1421] px-6 py-2',
      $mounted ? 'border-b-transparent' : 'border-b-orange/25'
    )}
  >
    <div>
      <slot name="topbar-left" />
    </div>
    <div class="flex flex-row items-center justify-end gap-4">
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
      class="border-b-orange/25 -z-10 min-h-0 w-full overflow-auto border-b bg-[#0D1421]"
    >
      <div
        class="px-6 pt-2 pb-6"
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
