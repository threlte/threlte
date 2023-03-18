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
    class="flex flex-col gap-2 text-lg"
  >
    <a href="/docs/learn/getting-started/introduction"> Documentation </a>

    <!-- Implement as soon as there are showcase entries -->
    <!-- <a href="/showcase"> Showcase </a> -->
    <div class="mt-4">
      <slot name="after" />
    </div>
    <slot name="socials" />
  </div>
</MobileNav>
