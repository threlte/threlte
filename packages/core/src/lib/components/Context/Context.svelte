<script lang="ts">
  import type { Snippet } from 'svelte'
  import {
    createThrelteContext,
    type CreateThrelteContextOptions
  } from '../../context/createThrelteContext.svelte.js'
  import type { Renderer } from '../../context/fragments/renderer.svelte.js'

  let { children, ...rest }: CreateThrelteContextOptions<Renderer> & { children: Snippet } =
    $props()

  createThrelteContext(rest)
</script>

{@render children()}
