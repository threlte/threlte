<script lang="ts">
  import Project from '../Project/Project.svelte'
  import Sheet from '../Sheet/Sheet.svelte'
  import Studio from '../Studio/Studio.svelte'

  export let studio = true
</script>

{#if studio}
  <Studio />
{/if}
<Project>
  <Sheet>
    <slot />
  </Sheet>
</Project>
