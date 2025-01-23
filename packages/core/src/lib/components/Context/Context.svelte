<script lang="ts">
  import type { Snippet } from 'svelte'
  import { type Renderer } from 'three'
  import {
    createThrelteContext,
    type CreateThrelteContextOptions
  } from '../../context/createThrelteContext.svelte'

  let {
    children,
    ...rest
  }: CreateThrelteContextOptions<Renderer> & { offsetSize?: boolean; children: Snippet } = $props()

  createThrelteContext(rest)
</script>

{@render children()}
