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
  import type { Snippet } from 'svelte'

  let { name, plugin, children }: { name: string; plugin: Plugin; children?: Snippet } = $props()

  injectPlugin(name, plugin)
</script>

{@render children?.()}
