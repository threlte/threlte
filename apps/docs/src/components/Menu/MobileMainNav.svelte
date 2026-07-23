<script lang="ts">
  import type { Snippet } from 'svelte'
  import MobileNav from './MobileNav.svelte'
  interface Props {
    logo?: Snippet
    socials?: Snippet
    children?: Snippet
  }

  let { logo, socials, children }: Props = $props()
</script>

<MobileNav>
  {#snippet topbarLeft()}
    <a href={import.meta.env.BASE_URL}>
      {@render logo?.()}
    </a>
  {/snippet}

  {#snippet content()}
    <div class="flex flex-col gap-2 text-lg">
      <a href={`${import.meta.env.BASE_URL}docs/learn/getting-started/introduction`}>
        Documentation
      </a>
      <a href={`${import.meta.env.BASE_URL}blog`}> Blog </a>

      <!-- Implement as soon as there are showcase entries -->
      <!-- <a href="/showcase"> Showcase </a> -->
      <div class="mt-4">
        {@render socials?.()}
      </div>
    </div>
  {/snippet}
  {@render children?.()}
</MobileNav>
