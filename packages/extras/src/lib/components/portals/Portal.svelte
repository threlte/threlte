<script lang="ts">
  import type { Snippet } from 'svelte'
  import { usePortal } from './usePortal.svelte'

  interface Props {
    id?: string
    children: Snippet
  }

  let { id = 'default', children }: Props = $props()

  const { addChild } = usePortal()

  $effect.pre(() => addChild(id, children))
</script>
