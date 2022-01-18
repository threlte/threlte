<script lang="ts">
  import type { Mesh } from 'three'
  import InteractiveObject from '../internal/InteractiveObject.svelte'
  import RaycastableObject from '../internal/RaycastableObject.svelte'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'
  import Object3DInstance from './Object3DInstance.svelte'

  export let mesh: Mesh

  // Object3DInstance
  export let position: Position | undefined
  export let scale: Scale | undefined
  export let rotation: Rotation | undefined
  export let viewportAware: boolean
  export let inViewport: boolean
  export let castShadow: boolean
  export let receiveShadow: boolean
  export let frustumCulled: boolean
  export let renderOrder: number
  export let lookAt: LookAt | undefined

  // self
  export let interactive: boolean
  export let ignorePointerEvents: boolean

  $: {
    if (interactive && ignorePointerEvents) {
      console.warn(
        'An Object cannot ignore pointer events and be interactive at the same time. Interactivity will be dismissed.'
      )
    }
  }
</script>

<Object3DInstance
  object={mesh}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {viewportAware}
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>

{#if !ignorePointerEvents}
  <RaycastableObject object={mesh} />

  {#if interactive}
    <InteractiveObject
      object={mesh}
      on:click
      on:contextmenu
      on:pointerup
      on:pointerdown
      on:pointerenter
      on:pointerleave
      on:pointermove
    />
  {/if}
{/if}
