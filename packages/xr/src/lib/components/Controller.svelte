<!--
@component `<Controller />` represents a THREE.XRTargetRaySpace, a THREE.XRGripSpace, and a controller model.
-->
<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store'
  import { T } from '@threlte/core'
  import { left as leftStore, right as rightStore } from '../hooks/useController'
  import { isHandTracking, pointerState, teleportState, controllerEvents } from '../internal/stores'
  import type { XRControllerEvents } from '../types'
  import PointerCursor from './internal/PointerCursor.svelte'
  import ShortRay from './internal/ShortRay.svelte'
  import ScenePortal from './internal/ScenePortal.svelte'
  import TeleportCursor from './internal/TeleportCursor.svelte'
  import TeleportRay from './internal/TeleportRay.svelte'
  import type { Snippet } from 'svelte'

  const stores = {
    left: leftStore,
    right: rightStore
  } as const
</script>

<script lang="ts">
  type Props = {
    children?: Snippet
    grip?: Snippet
    targetRay?: Snippet
    pointerRay?: Snippet
    pointerCursor?: Snippet
    teleportRay?: Snippet
    teleportCursor?: Snippet
  } & XRControllerEvents &
    (
      | {
          /** Whether the controller should be matched with the left hand. */
          left: true
          right?: undefined
          hand?: undefined
        }
      | {
          /** Whether the controller should be matched with the right hand. */
          right: true
          left?: undefined
          hand?: undefined
        }
      | {
          /** Whether the controller should be matched with the left or right hand. */
          hand: 'left' | 'right'
          left?: undefined
          right?: undefined
        }
    )

  let {
    left,
    right,
    hand,

    onconnected,
    ondisconnected,
    onselect,
    onselectend,
    onselectstart,
    onsqueeze,
    onsqueezeend,
    onsqueezestart,

    children,
    grip: gripSnippet,
    targetRay: targetRaySnippet,
    pointerRay: pointerRaySnippet,
    pointerCursor: pointerCursorSnippet,
    teleportRay: teleportRaySnippet,
    teleportCursor: teleportCursorSnippet
  }: Props = $props()

  const handedness = writable<'left' | 'right'>(left ? 'left' : right ? 'right' : hand)
  $effect.pre(() => handedness.set(left ? 'left' : right ? 'right' : (hand as 'left' | 'right')))

  $effect.pre(() =>
    controllerEvents[$handedness].set({
      onconnected,
      ondisconnected,
      onselect,
      onselectend,
      onselectstart,
      onsqueeze,
      onsqueezeend,
      onsqueezestart
    })
  )

  let store = $derived(stores[$handedness])
  let grip = $derived($store?.grip)
  let targetRay = $derived($store?.targetRay)
  let model = $derived($store?.model)
  let hasPointerControls = $derived($pointerState[$handedness].enabled)
  let hasTeleportControls = $derived($teleportState[$handedness].enabled)
</script>

{#if !$isHandTracking}
  {#if grip}
    <T is={grip}>
      {#if children}
        {@render children?.()}
      {:else}
        <T is={model} />
      {/if}

      {@render gripSnippet?.()}
    </T>
  {/if}

  {#if targetRay}
    <T is={targetRay}>
      {@render targetRaySnippet?.()}

      {#if hasPointerControls || hasTeleportControls}
        <ShortRay
          handedness={$handedness}
          children={pointerRaySnippet}
        />
      {/if}
    </T>
  {/if}
{/if}

<ScenePortal>
  {#if hasPointerControls}
    <PointerCursor
      handedness={$handedness}
      children={pointerCursorSnippet}
    />
  {/if}

  {#if hasTeleportControls && targetRay !== undefined}
    <TeleportRay
      {targetRay}
      handedness={$handedness}
      children={teleportRaySnippet}
    />

    <TeleportCursor
      handedness={$handedness}
      children={teleportCursorSnippet}
    />
  {/if}
</ScenePortal>
