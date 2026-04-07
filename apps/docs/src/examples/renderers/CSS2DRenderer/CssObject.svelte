<script lang="ts">
  import type { Props } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
  import { T } from '@threlte/core'

  type CssObjectProps = Props<typeof CSS2DObject> & {
    content?: Snippet
    pointerEvents?: boolean
  }

  let { content, pointerEvents = false, children, ...props }: CssObjectProps = $props()

  let element = $state<HTMLElement>()
</script>

<div
  bind:this={element}
  style:pointer-events={pointerEvents ? 'auto' : 'none !important'}
  style:will-change="transform"
>
  {@render content?.()}
</div>

{#if element !== undefined}
  <T
    {...props}
    is={CSS2DObject}
    args={[element]}
  >
    {#snippet children({ ref })}
      {@render children?.({ ref })}
    {/snippet}
  </T>
{/if}
