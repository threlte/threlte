<script lang="ts">
  import type { Snippet } from 'svelte'
  import Portal from './Portal.svelte'

  let {
    position = 'left',
    children
  }: { position?: 'left' | 'right' | 'center'; children?: Snippet } = $props()
</script>

<Portal target=".toolbar-items-{position}">
  {@render children?.()}
</Portal>
