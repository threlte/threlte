<!--
@component This component is used to inject plugins. You provide an injector
function that injects a plugin.

@example
```svelte
<InjectPlugin>
  {@render children?.()}
</InjectPlugin>
```
-->

<script lang="ts">
  import { injectPlugin, type Plugin } from '@threlte/core'
  import { untrack, type Snippet } from 'svelte'

  let { name, plugin, children }: { name: string; plugin: Plugin; children?: Snippet } = $props()

  injectPlugin(
    untrack(() => name),
    untrack(() => plugin)
  )
</script>

{@render children?.()}
