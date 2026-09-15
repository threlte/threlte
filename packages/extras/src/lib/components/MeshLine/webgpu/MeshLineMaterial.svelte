<script lang="ts">
  import { untrack, type ComponentProps } from 'svelte'
  import type OriginalComponent from '../MeshLineMaterial.svelte'

  let { ...props }: ComponentProps<typeof OriginalComponent> = $props()
  untrack(() => props)

  throw new Error(
    '<MeshLineMaterial> is not yet supported with WebGPU. Please open a GitHub issue if you would like support to be prioritized.'
  )
</script>
