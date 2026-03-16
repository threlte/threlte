<script lang="ts">
  import InnerView from './InnerView.svelte'
  import type { ViewProps } from './types.js'

  let { dom, children }: ViewProps = $props()
</script>

{#if dom}
  <InnerView {dom}>
    {@render children?.()}
  </InnerView>
{/if}
