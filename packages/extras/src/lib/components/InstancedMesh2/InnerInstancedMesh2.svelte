<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    children
  }: {
    children: Snippet
  } = $props()

  console.log('inner')
</script>

{@render children()}
