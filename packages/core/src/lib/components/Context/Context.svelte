<script lang="ts">
  import type { Snippet } from 'svelte'
  import {
    createThrelteContext,
    type CreateThrelteContextOptions
  } from '../../context/createThrelteContext.svelte'
  import type { Renderer } from '../../context/fragments/renderer.svelte'

  let { children, ...rest }: CreateThrelteContextOptions<Renderer> & { children: Snippet } =
    $props()

  createThrelteContext(rest)
</script>

{@render children()}
