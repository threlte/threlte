<script lang="ts">
  import { untrack, type ComponentProps } from 'svelte'
  import type OriginalComponent from '../UvMaterial.svelte'

  let { ...props }: ComponentProps<typeof OriginalComponent> = $props()
  untrack(() => props)

  throw new Error(
    '<UvMaterial> is not needed with WebGPU. Set `colorNode` on the material instead: https://threlte.xyz/docs/reference/extras/uv-material#webgpu'
  )
</script>
