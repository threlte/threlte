<script lang="ts">
  import { untrack, type ComponentProps } from 'svelte'
  import type OriginalComponent from '../ShadowAlpha.svelte'

  let { ...props }: ComponentProps<typeof OriginalComponent> = $props()
  untrack(() => props)

  throw new Error(
    '<ShadowAlpha> is not needed with WebGPU. Set `castShadowNode` on the material instead: https://threlte.xyz/docs/reference/extras/shadow-alpha#webgpu'
  )
</script>
