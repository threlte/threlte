<script lang="ts">
  import { useElementMounted } from '$hooks/useElementMounted'
  import { fade } from 'svelte/transition'
  import { customSlide } from './customSlide'
  import BurgerIcon from './BurgerIcon.svelte'
  import Search from '$components/Search/Search.svelte'

  export let search = false

  let showMenu = false

  const { action, mounted } = useElementMounted()
</script>

<div class="fixed left-0 top-0 z-40 flex max-h-screen w-full flex-col md:hidden">
  <header
    class={[
      'flex h-[var(--docs-navbar-height)] w-full shrink-0 flex-row items-center justify-between border-b bg-[#0A0F19] px-6 py-2',
      $mounted ? 'border-b-transparent' : 'border-b-orange/25'
    ]}
  >
    <div>
      <slot name="topbar-left" />
    </div>
    <div class="max-w-[30%]"></div>
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
      class="border-b-orange/25 -z-10 min-h-0 w-full overflow-auto border-b bg-[#0a0F19]"
    >
      <div
        class="px-6 pb-6 pt-2"
        in:fade={{ delay: 200, duration: 200 }}
        out:fade={{ duration: 200 }}
      >
        {#if search}
          <div class="relative w-full pb-8 pt-4">
            <Search />
          </div>
        {/if}
        <slot name="content" />
      </div>
    </div>
  {/if}
</div>

<!-- Mobile nav spacer -->
<div class="h-[var(--docs-navbar-height)]"></div>
