<script lang="ts">
  import { watch } from '@threlte/core'
  import { getContext } from 'svelte'
  import InnerInstancedSprite from './InnerInstancedSprite.svelte'
  import type { SpritesheetContext } from './Spritesheet'

  import type {
    InstancedSpriteEvents,
    InstancedSpriteProps,
    InstancedSpriteSlots
  } from './InstancedSprite.svelte'

  type $$Props = Required<InstancedSpriteProps>
  type $$Events = InstancedSpriteEvents
  type $$Slots = InstancedSpriteSlots

  const spritesheetCtx = getContext<SpritesheetContext>(
    'instanced-spritesheet-top-level-stores-ctx'
  )

  // Instanced sprites are ready to be rendered if there is no parent <Spritesheet/>
  // 		- this assumes that the user provided a ready {spritesheet} and {texture} props
  let ready = spritesheetCtx ? false : true

  // Otherwise, wait for the parent <Spritesheet/> component to load a texture and a spritesheet
  if (spritesheetCtx) {
    watch([spritesheetCtx.textureStore, spritesheetCtx.spritesheetStore], ([t, s]) => {
      if (t && s) ready = true
    })
  }

  export let ref: any
</script>

<!--
		spritesheet has to be created before making an instanced mesh,
		otherwise the animations don't work. Hot swapping a spritesheet
		should be possible, but might require extra work upstream
		to properly update GPGPUCompute and data texture on swap. Low priority.
 -->
{#if ready}
  <!-- todo, how to deal with types for inner/outer? -->
  <InnerInstancedSprite
    {...$$restProps}
    bind:mesh={ref}
  >
    <slot />
  </InnerInstancedSprite>
{/if}
