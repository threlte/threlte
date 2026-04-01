<script lang="ts">
  import MobileNav from './MobileNav.svelte'
</script>

<MobileNav>
  <svelte:fragment slot="topbar-left">
    <a href={import.meta.env.BASE_URL}>
      <slot name="logo" />
    </a>
  </svelte:fragment>
  <div
    slot="content"
    class="flex flex-col gap-2 text-lg"
  >
    <a href={`${import.meta.env.BASE_URL}docs/learn/getting-started/introduction`}> Documentation </a>
    <a href={`${import.meta.env.BASE_URL}blog`}> Blog </a>

    <!-- Implement as soon as there are showcase entries -->
    <!-- <a href="/showcase"> Showcase </a> -->
    <div class="mt-4">
      <slot name="socials" />
    </div>
  </div>
</MobileNav>
