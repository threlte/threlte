<script lang="ts">
  import InnerView from './InnerView.svelte'
  import type { ViewProps } from './types.js'

  let { dom, scene, children }: ViewProps = $props()
</script>

{#if dom}
  <InnerView
    {dom}
    {scene}
  >
    {@render children?.()}
  </InnerView>
{/if}
