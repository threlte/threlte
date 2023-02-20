<script lang="ts">
  import MobileNav from './MobileNav.svelte'
</script>

<MobileNav>
  <svelte:fragment slot="topbar-left">
    <a href="/">
      <slot name="logo" />
    </a>
  </svelte:fragment>
  <div
    slot="content"
    class="flex flex-col items-end"
  >
    <a href="/docs/learn/getting-started"> Docs </a>
    <a href="/showcase"> Showcase </a>
    <div class="mt-4">
      <slot name="after" />
    </div>
    <slot name="socials" />
  </div>
</MobileNav>
