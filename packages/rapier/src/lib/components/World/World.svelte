<script lang="ts">
  import { initRapier } from '../../lib/initRapier.svelte'
  import InnerWorld from './InnerWorld.svelte'
  import type { WorldProps } from './types'

  let { fallback, children, ...rest }: WorldProps = $props()
</script>

{#await initRapier()}
  <InnerWorld {...rest}>
    {@render children?.()}
  </InnerWorld>
{:catch error}
  {@render fallback?.(error)}
{/await}
