<script lang="ts">
  import { initRapier } from '../../lib/initRapier.svelte.js'
  import InnerWorld from './InnerWorld.svelte'
  import type { WorldProps } from './types.js'

  let { fallback, children, ...rest }: WorldProps = $props()
</script>

{#await initRapier() then}
  <InnerWorld {...rest}>
    {@render children?.()}
  </InnerWorld>
{:catch error}
  {@render fallback?.(error)}
{/await}
