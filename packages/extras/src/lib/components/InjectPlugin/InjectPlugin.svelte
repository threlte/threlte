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
  import { injectPlugin } from '@threlte/core'
  import { untrack } from 'svelte'
  import type { InjectPluginProps } from './types.js'

  let { name, plugin, children }: InjectPluginProps = $props()

  injectPlugin(
    untrack(() => name),
    untrack(() => plugin)
  )
</script>

{@render children?.()}
