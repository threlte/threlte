<script lang="ts">
  import { initRapier } from '../../lib/initRapier.svelte'
  import InnerWorld from './InnerWorld.svelte'
  import type { WorldProps } from './types'

  let { fallback, children, ...rest }: WorldProps = $props()
</script>

{#await initRapier() then _}
  <InnerWorld {...rest}>
    {@render children?.()}
  </InnerWorld>
{:catch error}
  {@render fallback?.(error)}
{/await}
