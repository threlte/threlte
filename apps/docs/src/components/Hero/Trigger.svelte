<script lang="ts">
  import { scrollPos } from './scrollPos'

  let _in: number | undefined = undefined
  let _out: number | undefined = undefined

  export { _in as in }
  export { _out as out }
</script>

{#if (_in === undefined || $scrollPos > _in) && (_out === undefined || $scrollPos < _out)}
  <slot />
{:else}
  <slot name="fallback" />
{/if}
