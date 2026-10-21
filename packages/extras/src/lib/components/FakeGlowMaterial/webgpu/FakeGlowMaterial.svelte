<script lang="ts">
  import { untrack, type ComponentProps } from 'svelte'
  import type OriginalComponent from '../FakeGlowMaterial.svelte'

  let { ...props }: ComponentProps<typeof OriginalComponent> = $props()
  untrack(() => props)

  throw new Error(
    '<FakeGlowMaterial> is not yet supported with WebGPU. Please open a GitHub issue if you would like support to be prioritized.'
  )
</script>
