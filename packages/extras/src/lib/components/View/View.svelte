<script lang="ts">
  import InnerView from './InnerView.svelte'
  import type { ViewProps } from './types'

  let { dom, children }: ViewProps = $props()
</script>

{#if dom}
  <InnerView {dom}>
    {@render children?.()}
  </InnerView>
{/if}
