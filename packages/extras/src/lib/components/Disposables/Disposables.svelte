<script lang="ts">
  import { DisposableObject, type DisposableObjectProperties } from '@threlte/core'

  export let disposables: NonNullable<DisposableObjectProperties['object']>[]
</script>

<!-- Manually dispose objects -->
{#each disposables as disposable}
  <DisposableObject object={disposable} />
{/each}

<!-- Tell the tree to stop disposing from here on -->
<DisposableObject dispose={false}>
  <slot />
</DisposableObject>
